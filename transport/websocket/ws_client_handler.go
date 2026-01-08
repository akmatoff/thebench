package websocket

import (
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

	connectedMessage := infra.NewOutgoingMessage(infra.CONNECTED, infra.ConnectedMessage{
		PlayerID: c.clientID,
	})

	c.wsManager.SendToClient(c.clientID, connectedMessage)

	snapshot := c.gameSystem.GetSnapshot()
	stateMessage := infra.NewOutgoingMessage(infra.STATE, snapshot)

	c.wsManager.SendToClient(c.clientID, stateMessage)

	for {
		_, raw, err := c.conn.ReadMessage()
		if err != nil {
			if !websocket.IsCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("read error for client %s: %v", c.clientID, err)
			}
			return
		}

		message, err := infra.ParseIncomingMessage(raw)
		if err != nil {
			log.Printf("parse error for client %s: %v", c.clientID, err)
			return
		}

		switch m := message.(type) {

		case infra.PingMessage:
			c.sendPong()

		case infra.ActionMessage:
			c.handleAction(m.Action)

		default:
			log.Println("Uknown message")
		}
	}
}

func (c *ClientHandler) handleAction(actionStr string) {
	action := domain.Action(actionStr)

	validActions := map[domain.Action]bool{
		domain.ActionSit:         true,
		domain.ActionLeave:       true,
		domain.ActionSmoke:       true,
		domain.ActionStopSmoking: true,
		domain.ActionWave:        true,
		domain.ActionPat:         true,
		domain.ActionMoveLeft:    true,
		domain.ActionMoveRight:   true,
	}

	if !validActions[action] {
		log.Printf("invalid action for client %s: %s", c.clientID, action)
		return
	}

	if err := c.gameSystem.PerformAction(c.clientID, action); err != nil {
		log.Printf("Action failed for client %s: %v", c.clientID, err)
		return
	}

	for _, p := range c.gameSystem.GetSnapshot().Players {
		log.Printf("Player position x: %v", p.Position.X)
	}

}

func (c *ClientHandler) sendPong() {
	pong := infra.NewOutgoingMessage(infra.PONG, nil)
	c.wsManager.SendToClient(c.clientID, pong)
}
