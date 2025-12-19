package main

import (
	"log"
	"net/http"

	"github.com/akmatoff/thebench/application"
	"github.com/akmatoff/thebench/infra"
	"github.com/gorilla/websocket"
)

func main() {
	upgrader := websocket.Upgrader{}

	eventBus := infra.NewEventBus()

	benchService := application.NewBenchService(
		infra.NewBenchRepository(),
		eventBus,
	)

	http.HandleFunc("/bench", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			log.Println("upgrade:", err)
			return
		}

		wsManager := infra.NewWebSocketManager(eventBus)

		go wsManager.HandleConnection(conn)
	})
	http.ListenAndServe(":7000", nil)
}
