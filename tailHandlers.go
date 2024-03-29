package main

import (
	"encoding/json"
	"fmt"
	"github.com/hpcloud/tail"
	"log"
	"net/http"
	"sync"
)

func createStartTailHandler(broadcast *chan *message, usePolling *bool, tailers *map[string]*tail.Tail, tailMux *sync.Mutex) http.HandlerFunc {
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

		tailMux.Lock()

		(*tailers)[fileIdent.FilePath] = fileTail

		tailMux.Unlock()

		go handleNewLines(&fileTail.Lines, broadcast, fileIdent.FilePath)
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

func createStopTailHandler(tailers *map[string]*tail.Tail, tailMux *sync.Mutex) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		var fileIdent fileIdentifier
		decoder := json.NewDecoder(r.Body)
		err := decoder.Decode(&fileIdent)

		if err != nil {
			w.WriteHeader(500)
			fmt.Println(err)
			fmt.Println("error when deleting")
			return
		}

		if fileIdent.FilePath == "" {
			w.WriteHeader(500)
			fmt.Println("filepath empty")
			return
		}

		if (*tailers)[fileIdent.FilePath] == nil {
			w.WriteHeader(500)
			fmt.Println("filepath nil")
			return
		}

		tailMux.Lock()

		delete(*tailers, fileIdent.FilePath)

		tailMux.Unlock()
	}
}
