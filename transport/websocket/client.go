package websocket

import (
	"encoding/json"
	"log"

	"github.com/akmatoff/thebench/application"
	"github.com/akmatoff/thebench/domain"
	"github.com/akmatoff/thebench/infra"
	"github.com/gorilla/websocket"
)

type ClientHandler struct {
	clientID   string
	conn       *websocket.Conn
	gameSystem *application.GameSystem
	wsManager  *infra.WebSocketManager
}

func NewClientHandler(clientID string, conn *websocket.Conn, gameSystem *application.GameSystem, wsManager *infra.WebSocketManager) *ClientHandler {
	return &ClientHandler{
		clientID:   clientID,
		conn:       conn,
		gameSystem: gameSystem,
		wsManager:  wsManager,
	}
}

func (c *ClientHandler) Run() {
	go c.listen()
}

func (c *ClientHandler) listen() {
	defer func() {
		c.wsManager.RemoveClient(c.clientID)
		c.gameSystem.RemovePlayer(c.clientID)
		c.conn.Close()
		log.Printf("Client %s disconnected", c.clientID)
	}()

	snapshot := c.gameSystem.GetSnapshot()

	c.wsManager.SendToClient(c.clientID, snapshot)

	for {
		_, raw, err := c.conn.ReadMessage()
		if err != nil {
			if !websocket.IsCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("read error for client %s: %v", c.clientID, err)
			}
			return
		}

		var message IncommingMessage
		if err := json.Unmarshal(raw, &message); err != nil {
			log.Printf("unmarshal error for client %s: %v", c.clientID, err)
			continue
		}

		switch message.Type {

		case "PING":
			c.sendPong()

		case "ACTION":
			c.handleAction(message.Payload)
		}

	}
}

func (c *ClientHandler) handleAction(payload any) {
	action := domain.Action(payload.(struct{ action string }).action)

	validActions := map[domain.Action]bool{
		domain.ActionSit:   true,
		domain.ActionLeave: true,
		domain.ActionSmoke: true,
		domain.ActionWave:  true,
		domain.ActionPat:   true,
	}

	if !validActions[action] {
		log.Printf("invalid action for client %s: %s", c.clientID, action)
		return
	}

	if err := c.gameSystem.PerformAction(c.clientID, action); err != nil {
		log.Printf("Action failed for client %s: %v", c.clientID, err)
		return
	}

	snapshot := c.gameSystem.GetSnapshot()
	c.wsManager.Broadcast(snapshot)
}

func (c *ClientHandler) sendPong() {
	pong := struct {
		Type string `json:"type"`
	}{Type: "PONG"}

	data, _ := json.Marshal(pong)
	c.conn.WriteMessage(websocket.TextMessage, data)
}
