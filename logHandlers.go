package main

import (
	"encoding/json"
	"net/http"
)

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
