package main

import (
	"flag"
	"github.com/hpcloud/tail"
	"github.com/pkg/browser"
	"log"
	"net/http"
	"sync"
)

func main() {
	port := flag.String("port", "8080", "the port")
	usePolling := flag.Bool("usePolling", true, "use polling to detect changes")
	openBrowser := flag.Bool("openBrowser", true, "open browser window directly")

	flag.Parse()

	log.Println("port:", *port)
	log.Println("usePolling:", *usePolling)

	var tailClients SocketQueue
	var stateClients SocketQueue
	var mux sync.Mutex
	messages := make([]*message, 0)
	tailers := make(map[string]*tail.Tail)
	broadcast := make(chan *message)
	stateUpdate := make(chan *string)

	http.HandleFunc("/tail", createClientTailHandler(&tailClients, &messages))
	http.HandleFunc("/state", createClientStateHandler(&stateClients, &stateUpdate, &tailers))
	http.HandleFunc("/download", createLogDownloadHandler(&messages))
	http.HandleFunc("/delete", createDeleteLogHandler(&messages))
	http.HandleFunc("/addFile", createStartTailHandler(&broadcast, usePolling, &tailers, &mux))
	http.HandleFunc("/removeFile", createStopTailHandler(&tailers, &mux))
	http.HandleFunc("/log", createUploadLogHandler(&broadcast))
	http.Handle("/", http.FileServer(assetFS()))

	go handleMessages(&tailClients, &broadcast, &messages)

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
