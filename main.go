package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/hpcloud/tail"
	"github.com/matoous/go-nanoid"
	"log"
	"net/http"
	"os"
	"time"
)

type message struct {
	Date time.Time `json:"date"`
	Text string    `json:"data"`
	Id   string    `json:"id"`
}

type anonymousMessage struct {
	Text string `json:"data"`
}

type messageIdentifier struct {
	Id string `json:"id"`
}

func main() {
	port := flag.String("port", "8080", "the port")
	file := flag.String("file", "", "the file to tail")
	usePolling := flag.Bool("usePolling", true, "use polling to detect changes")

	flag.Parse()

	if *file == "" {
		flag.PrintDefaults()
		os.Exit(1)
	}

	log.Println("port:", *port)
	log.Println("file:", *file)
	log.Println("usePolling:", *usePolling)

	var clients SocketQueue
	messages := make([]*message, 0)
	broadcast := make(chan message)

	http.HandleFunc("/tail", createClientHandler(&clients, &messages))
	http.HandleFunc("/download", createLogDownloadHandler(&messages))
	http.HandleFunc("/delete", createDeleteLogHandler(&messages))
	http.HandleFunc("/log", createUploadLogHandler(broadcast))
	http.Handle("/", http.FileServer(assetFS()))

	fileTail, err := tail.TailFile(*file, tail.Config{Follow: true, Poll: *usePolling})

	if err != nil {
		log.Fatal(err)
	}

	go handleMessages(&clients, broadcast, &messages)
	go handleNewLines(fileTail.Lines, broadcast)

	err = http.ListenAndServe(":"+*port, nil)
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}
}

func createClientHandler(clients *SocketQueue, messages *[]*message) http.HandlerFunc {
	var upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			log.Println("socket origin:", r.Host)
			return true
		},
	}

	return func(w http.ResponseWriter, r *http.Request) {
		ws, err := upgrader.Upgrade(w, r, nil)

		log.Println("new client")

		if err != nil {
			log.Println(err)
			return
		}

		for _, message := range *messages {
			_ = ws.WriteJSON(message)
		}

		clients.Add(ws)
	}
}

func createUploadLogHandler(broadcast chan message) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var msg anonymousMessage
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&msg)
		if err != nil {
			w.WriteHeader(500)
			return
		}
		broadcast <- newMessage(msg.Text)
	}
}

func createDeleteLogHandler(messages *[]*message) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var messageId messageIdentifier
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&messageId)

		if err != nil {
			w.WriteHeader(http.StatusInternalServerError)
			_, _ = w.Write([]byte("500 - Y U NO SEND logId?!"))
			return
		}

		for i, msg := range *messages {
			if msg.Id == messageId.Id {
				msgVal := *messages
				*messages = append(msgVal[:i], msgVal[i+1:]...)
				w.WriteHeader(http.StatusOK)
				_, _ = w.Write([]byte("200 - that key is no more"))
				return
			}
		}

		w.WriteHeader(http.StatusNotFound)
		_, _ = w.Write([]byte("404 - Key not found"))
	}
}

func createLogDownloadHandler(messages *[]*message) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		keys, ok := r.URL.Query()["logId"]

		if !ok || len(keys[0]) < 1 {
			w.WriteHeader(http.StatusInternalServerError)
			_, _ = w.Write([]byte("500 - Y U NO SEND logId?!"))
			return
		}

		logId := keys[0]

		for _, msg := range *messages {
			if msg.Id == logId {
				w.Header().Set("Content-Type", "application/json")
				_, _ = w.Write([]byte(msg.Text))
				return
			}
		}

		w.WriteHeader(http.StatusInternalServerError)
		_, _ = w.Write([]byte("500 - Y U SEND NOT EXISTING logId?!"))

	}
}

func handleMessages(clients *SocketQueue, broadcast chan message, messages *[]*message) {
	for {
		msg := <-broadcast

		*messages = append(*messages, &msg)

		for i, client := range clients.connections {
			log.Printf("%s %s", client.LocalAddr().String(), i)
			err := client.WriteJSON(msg)

			if err != nil {
				log.Printf("error: %v", err)
				_ = client.Close()
				go clients.Remove(client)
			}
		}
	}
}

func handleNewLines(lines chan *tail.Line, broadcast chan message) {
	for line := range lines {
		txt := line.Text
		msg := newMessage(txt)

		broadcast <- msg
		fmt.Println(txt)
	}
}

func newMessage(text string) message {
	msg := message{}
	msg.Text = text
	msg.Date = time.Now()

	id, err := gonanoid.New()
	if err != nil {
		return msg
	}

	msg.Id = id

	return msg
}
