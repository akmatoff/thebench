package infra

import (
	"sync"

	"github.com/akmatoff/thebench/domain"
	"github.com/akmatoff/thebench/utils"
	"github.com/gorilla/websocket"
)

type Client struct {
	ID     string
	Conn   *websocket.Conn
	Role   domain.ParticipantRole
	Closed bool
}

type WebSocketManager struct {
	mu      sync.RWMutex
	clients map[string]*Client
	bus     *EventBus
}

func NewWebSocketManager(bus *EventBus) *WebSocketManager {
	return &WebSocketManager{
		clients: make(map[string]*Client),
		bus:     bus,
	}
}

func (ws *WebSocketManager) AddClient(id string, client *Client) {
	ws.mu.Lock()
	defer ws.mu.Unlock()
	ws.clients[id] = client
}

func (ws *WebSocketManager) RemoveClient(id string) {
	ws.mu.Lock()
	defer ws.mu.Unlock()

	if client, ok := ws.clients[id]; ok {
		client.Closed = true
		client.Conn.Close()
		delete(ws.clients, id)
	}
}

func (ws *WebSocketManager) GetClient(id string) *Client {
	ws.mu.RLock()
	defer ws.mu.RUnlock()
	return ws.clients[id]
}

func (ws *WebSocketManager) HandleConnection(conn *websocket.Conn) {
	clientID := utils.GenerateID()

	client := &Client{
		Conn:   conn,
		Role:   domain.Witness,
		Closed: false,
	}

	ws.AddClient(clientID, client)
}

func (ws *WebSocketManager) Broadcast(event any) {

}

func (ws *WebSocketManager) CloseConnection(id string) {

}
