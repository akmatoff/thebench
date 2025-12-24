package main

import (
	"log"
	"net/http"
	"os"
	"sync"

	"github.com/akmatoff/thebench/application"
	"github.com/akmatoff/thebench/domain"
	"github.com/akmatoff/thebench/infra"
	"github.com/akmatoff/thebench/utils"
	"github.com/gorilla/websocket"
)

var (
	gameSystem  = application.NewGameSystem()
	wsManager   = infra.NewWebSocketManager()
	wsMu        sync.Mutex
	clientCount = 0
)

func main() {
	distPath := "./frontend/dist"

	if _, err := os.Stat(distPath); err != nil {
		log.Fatalf("Frontend dist not found at %s. Run npm run build", distPath)
	}

	fileServer := http.FileServer(http.Dir(distPath))

	http.Handle("/", http.StripPrefix("/", fileServer))

	upgrader := websocket.Upgrader{
		CheckOrigin: func(r *http.Request) bool {
			return true
		},
	}

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			log.Println("upgrade:", err)
			return
		}

		wsMu.Lock()
		clientCount++
		clientID := utils.GenerateID()
		wsMu.Unlock()

		player := domain.NewWitness(clientID)

		gameSystem.AddPlayer(player)

		client := infra.Client{
			ID:   clientID,
			Conn: conn,
			Role: player.Role,
		}

		wsManager.AddClient(clientID, &client)

	})
	http.ListenAndServe(":7000", nil)
}
