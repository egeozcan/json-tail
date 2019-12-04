package main

import (
	"flag"
	"fmt"
	"github.com/gorilla/websocket"
	"github.com/hpcloud/tail"
	"log"
	"net/http"
	"os"
	"time"
)

type message struct {
	Date time.Time `json:"date"`
	Text string    `json:"data"`
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

	clients := make([]*websocket.Conn, 0)
	messages := make([]*message, 0)
	broadcast := make(chan message)

	http.HandleFunc("/tail", createClientHandler(&clients, &messages))
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

func createClientHandler(clients *[]*websocket.Conn, messages *[]*message) http.HandlerFunc {
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

		*clients = append(*clients, ws)
	}
}

func handleMessages(clients *[]*websocket.Conn, broadcast chan message, messages *[]*message) {
	for {
		msg := <-broadcast

		*messages = append(*messages, &msg)

		for i, client := range *clients {
			err := client.WriteJSON(msg)

			if err != nil {
				log.Printf("error: %v", err)
				//ded clients are ded
				_ = client.Close()
				clientList := *clients
				*clients = append(clientList[:i], clientList[i+1:]...)
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
	return msg
}
