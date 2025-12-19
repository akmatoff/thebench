package main

import (
	"log"
	"net/http"
	"os"

	"github.com/akmatoff/thebench/infra"
	"github.com/gorilla/websocket"
)

func main() {
	distPath := "./frontend/dist"

	if _, err := os.Stat(distPath); err != nil {
		log.Fatalf("Frontend dist not found at %s. Run npm run build", distPath)
	}

	fileServer := http.FileServer(http.Dir(distPath))

	http.Handle("/", http.StripPrefix("/", fileServer))

	upgrader := websocket.Upgrader{}

	eventBus := infra.NewEventBus()

	// benchService := application.NewBenchService(
	// 	infra.NewBenchRepository(),
	// 	eventBus,
	// )

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
