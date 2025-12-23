package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/websocket"
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

	// benchService := application.NewBenchService(
	// 	infra.NewBenchRepository(),
	// 	eventBus,
	// )

	http.HandleFunc("/ws", func(w http.ResponseWriter, r *http.Request) {
		conn, err := upgrader.Upgrade(w, r, nil)

		if err != nil {
			log.Println("upgrade:", err)
			return
		}

		log.Println(conn)

		// wsManager := infra.NewWebSocketManager()

	})
	http.ListenAndServe(":7000", nil)
}
