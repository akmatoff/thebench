package main

import (
	"log"
	"net/http"
	"time"

	"github.com/akmatoff/thebench/application"
	"github.com/akmatoff/thebench/infra"
	"github.com/akmatoff/thebench/transport/websocket"
)

func main() {
	gameSystem := application.NewGameSystem()
	wsManager := infra.NewWebSocketManager()

	wsManager.StartBroadcastLoop(gameSystem, 60*time.Millisecond)

	wsHandler := websocket.NewHandler(gameSystem, wsManager)

	http.Handle("/ws", wsHandler)

	log.Println("Listening on port 7000")
	http.ListenAndServe(":7000", nil)
}
