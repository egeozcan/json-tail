package main

import (
	"github.com/gorilla/websocket"
	"github.com/hpcloud/tail"
	"log"
	"net/http"
)

func createClientTailHandler(clients *SocketQueue, messages *[]*message) http.HandlerFunc {
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

		clients.Add(ws)

		for _, message := range *messages {
			err = ws.WriteJSON(message)

			if err != nil {
				break
			}
		}
	}
}

func createClientStateHandler(stateClients *SocketQueue, stateUpdate *chan *string, tailers *map[string]*tail.Tail) http.HandlerFunc {
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

		if err != nil {
			log.Println(err)
			return
		}

		log.Println("new state client")

		stateClients.Add(ws)

		for {
			<-*stateUpdate

			keys := make([]string, 0, len(*tailers))
			for k := range *tailers {
				keys = append(keys, k)
			}

			err := ws.WriteJSON(keys)

			if err != nil {
				log.Printf("error when serving state: %v", err)
				_ = ws.Close()
				return
			}
		}
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
