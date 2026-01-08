package websocket

import (
	"net/http"

	"github.com/akmatoff/thebench/application"
	"github.com/akmatoff/thebench/domain"
	"github.com/akmatoff/thebench/infra"
	"github.com/akmatoff/thebench/utils"
	"github.com/gorilla/websocket"
)

type Handler struct {
	gameSystem *application.GameSystem
	wsManager  *infra.WebSocketManager
	upgrader   *websocket.Upgrader
}

func NewHandler(gameSystem *application.GameSystem, wsManager *infra.WebSocketManager) *Handler {
	return &Handler{
		gameSystem: gameSystem,
		wsManager:  wsManager,
		upgrader: &websocket.Upgrader{
			CheckOrigin: func(r *http.Request) bool {
				return true
			},
		},
	}
}

func (h *Handler) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	conn, err := h.upgrader.Upgrade(w, r, nil)

	if err != nil {
		return
	}

	clientID := utils.GenerateID()
	player := domain.NewWitness(clientID)

	h.gameSystem.AddPlayer(player)

	client := infra.NewClient(clientID, conn, player.Role)
	h.wsManager.AddClient(clientID, client)

	clientHandler := NewClientHandler(clientID, conn, h.gameSystem, h.wsManager)
	clientHandler.Run()
}
