package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/akmatoff/thebench/application"
	"github.com/akmatoff/thebench/infra"
	"github.com/akmatoff/thebench/transport/websocket"
)

func main() {
	distPath := "./frontend/dist"

	if _, err := os.Stat(distPath); err != nil {
		log.Fatalf("Frontend dist not found at %s. Run npm run build", distPath)
	}

	fileServer := http.FileServer(http.Dir(distPath))

	http.Handle("/", http.StripPrefix("/", fileServer))

	gameSystem := application.NewGameSystem()
	wsManager := infra.NewWebSocketManager()

	wsManager.StartBroadcastLoop(gameSystem, 60*time.Millisecond)

	wsHandler := websocket.NewHandler(gameSystem, wsManager)

	http.Handle("/ws", wsHandler)

	log.Println("Listening on port 7000")
	http.ListenAndServe(":7000", nil)
}
