package infra

import (
	"encoding/json"
	"log"
	"sync"

	"github.com/akmatoff/thebench/domain"
	"github.com/gorilla/websocket"
)

type Client struct {
	ID   string
	Conn *websocket.Conn
	Role domain.PlayerRole
}

type WebSocketManager struct {
	mu      sync.RWMutex
	clients map[string]*Client
}

func NewWebSocketManager() *WebSocketManager {
	return &WebSocketManager{
		clients: make(map[string]*Client),
	}
}

func (wm *WebSocketManager) AddClient(id string, client *Client) {
	wm.mu.Lock()
	defer wm.mu.Unlock()
	wm.clients[id] = client
}

func (wm *WebSocketManager) RemoveClient(id string) {
	wm.mu.Lock()
	defer wm.mu.Unlock()
	if client, ok := wm.clients[id]; ok {
		client.Conn.Close()
		delete(wm.clients, id)
	}
}

func (wm *WebSocketManager) Broadcast(snapshot any) {
	wm.mu.RLock()
	defer wm.mu.RUnlock()

	data, err := json.Marshal(snapshot)
	if err != nil {
		log.Printf("broadcast marshal error: %v", err)
		return
	}

	for _, client := range wm.clients {
		if err := client.Conn.WriteMessage(websocket.TextMessage, data); err != nil {
			log.Printf("broadcast to %s failed: %v", client.ID, err)
		}
	}
}
