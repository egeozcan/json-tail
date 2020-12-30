package main

import (
	"encoding/json"
	"flag"
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/hpcloud/tail"
	"github.com/matoous/go-nanoid"
	"github.com/pkg/browser"
	"log"
	"net/http"
	"time"
)

type anonymousMessage struct {
	Text string `json:"data"`
}

type messageIdentifier struct {
	Id string `json:"id"`
}

type fileIdentifier struct {
	FilePath string `json:"path"`
}

type message struct {
	messageIdentifier
	anonymousMessage
	fileIdentifier
	Date time.Time `json:"date"`
}

func main() {
	port := flag.String("port", "8080", "the port")
	usePolling := flag.Bool("usePolling", true, "use polling to detect changes")
	openBrowser := flag.Bool("openBrowser", true, "open browser window directly")

	flag.Parse()

	log.Println("port:", *port)
	log.Println("usePolling:", *usePolling)

	var clients SocketQueue
	messages := make([]*message, 0)
	tailers := make(map[string]*tail.Tail)
	broadcast := make(chan *message)

	http.HandleFunc("/tail", createClientHandler(&clients, &messages))
	http.HandleFunc("/download", createLogDownloadHandler(&messages))
	http.HandleFunc("/delete", createDeleteLogHandler(&messages))
	http.HandleFunc("/addFile", createStartTailHandler(&broadcast, usePolling, &tailers))
	http.HandleFunc("/removeFile", createStopTailHandler(&tailers))
	http.HandleFunc("/log", createUploadLogHandler(&broadcast))
	http.Handle("/", http.FileServer(assetFS()))

	go handleMessages(&clients, &broadcast, &messages)

	if *openBrowser {
		go launchBrowser("localhost:" + *port)
	}

	log.Fatal("ListenAndServe: ", http.ListenAndServe(":"+*port, nil))
}

func launchBrowser(address string) {
	err := browser.OpenURL(address)

	if err != nil {
		log.Println("error when opening the browser", err)
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

func createStartTailHandler(broadcast *chan *message, usePolling *bool, tailers *map[string]*tail.Tail) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var fileIdent fileIdentifier
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&fileIdent)

		if err != nil || fileIdent.FilePath == "" || (*tailers)[fileIdent.FilePath] != nil {
			w.WriteHeader(500)
			return
		}

		fileTail, err := tail.TailFile(fileIdent.FilePath, tail.Config{Follow: true, Poll: *usePolling})

		if err != nil {
			log.Println(err)
			w.WriteHeader(500)
			return
		}

		(*tailers)[fileIdent.FilePath] = fileTail

		go handleNewLines(&fileTail.Lines, broadcast, fileIdent.FilePath)
	}
}

func createStopTailHandler(tailers *map[string]*tail.Tail) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var fileIdent fileIdentifier
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&fileIdent)

		if err != nil || fileIdent.FilePath == "" || (*tailers)[fileIdent.FilePath] == nil {
			w.WriteHeader(500)
			return
		}

		delete(*tailers, fileIdent.FilePath)
	}
}

func createUploadLogHandler(broadcast *chan *message) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var msg anonymousMessage
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&msg)
		if err != nil {
			w.WriteHeader(500)
			return
		}
		*broadcast <- newMessage(msg.Text)
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

func handleMessages(clients *SocketQueue, broadcast *chan *message, messages *[]*message) {
	for {
		msg := <-*broadcast

		*messages = append(*messages, msg)

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

func handleNewLines(lines *chan *tail.Line, broadcast *chan *message, filePath string) {
	for line := range *lines {
		txt := line.Text
		msg := newMessageWithFileName(txt, filePath)

		*broadcast <- msg
		fmt.Println(txt)
	}
}

func newMessageWithFileName(text string, fileName string) *message {
	msg := newMessage(text)
	msg.FilePath = fileName

	return msg
}

func newMessage(text string) *message {
	msg := message{}
	msg.Text = text
	msg.Date = time.Now()

	id, err := gonanoid.New()
	if err != nil {
		return &msg
	}

	msg.Id = id

	return &msg
}
