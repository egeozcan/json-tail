package main

import (
	"flag"
	"github.com/hpcloud/tail"
	"github.com/zserge/lorca"
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

	http.HandleFunc("/tail", createClientTailHandler(&tailClients, &messages))
	http.HandleFunc("/state", createClientStateHandler(&stateClients, &tailers))
	http.HandleFunc("/download", createLogDownloadHandler(&messages))
	http.HandleFunc("/delete", createDeleteLogHandler(&messages))
	http.HandleFunc("/addFile", createStartTailHandler(&broadcast, usePolling, &tailers, &mux))
	http.HandleFunc("/removeFile", createStopTailHandler(&tailers, &mux))
	http.HandleFunc("/log", createUploadLogHandler(&broadcast))
	http.Handle("/", http.FileServer(assetFS()))

	go handleMessages(&tailClients, &broadcast, &messages)
	go startServer(port)

	if *openBrowser {
		ui, err := lorca.New("http://localhost:"+*port, "", 1920, 1280)
		if err != nil {
			log.Fatal(err)
		}

		defer ui.Close()

		<-ui.Done()
	}
}

func startServer(port *string) {
	log.Fatal("ListenAndServe: ", http.ListenAndServe(":"+*port, nil))
}
