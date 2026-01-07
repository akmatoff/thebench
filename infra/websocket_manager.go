package infra

import (
	"encoding/json"
	"log"
	"sync"
	"time"

	"github.com/akmatoff/thebench/application"
	"github.com/akmatoff/thebench/domain"
	"github.com/gorilla/websocket"
)

type Client struct {
	ID       string
	Conn     *websocket.Conn
	Role     domain.PlayerRole
	SendChan chan []byte
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

func NewClient(id string, conn *websocket.Conn, role domain.PlayerRole) *Client {
	return &Client{
		ID:       id,
		Conn:     conn,
		Role:     role,
		SendChan: make(chan []byte, 256),
	}
}

func (wm *WebSocketManager) AddClient(id string, client *Client) {
	wm.mu.Lock()
	wm.clients[id] = client
	defer wm.mu.Unlock()

	go func() {
		defer client.Conn.Close()
		for msg := range client.SendChan {
			err := client.Conn.WriteMessage(websocket.TextMessage, msg)
			if err != nil {
				log.Printf("write error to %s: %v", id, err)
				return
			}
		}
	}()
}

func (wm *WebSocketManager) RemoveClient(id string) {
	wm.mu.Lock()
	defer wm.mu.Unlock()
	if client, ok := wm.clients[id]; ok {
		client.Conn.Close()
		delete(wm.clients, id)
	}
}

func (wm *WebSocketManager) Broadcast(message OutgoingMessage) {
	wm.mu.RLock()
	defer wm.mu.RUnlock()

	data, err := json.Marshal(message)
	if err != nil {
		log.Printf("broadcast marshal error: %v", err)
		return
	}

	for _, client := range wm.clients {
		select {
		case client.SendChan <- data:
		default:
			log.Printf("send to %s failed: channel full", client.ID)
		}
	}
}

func (wm *WebSocketManager) SendToClient(clientID string, msg OutgoingMessage) {
	data, err := json.Marshal(msg)
	if err != nil {
		log.Printf("send to %s failed: %v", clientID, err)
		return
	}

	wm.mu.RLock()
	defer wm.mu.RUnlock()

	client, ok := wm.clients[clientID]
	if !ok {
		return
	}

	select {
	case client.SendChan <- data:
	default:
		log.Printf("send to %s failed: channel full", client.ID)
	}
}

func (wm *WebSocketManager) StartBroadcastLoop(gameSystem *application.GameSystem, interval time.Duration) {
	ticker := time.NewTicker(interval)

	go func() {
		for range ticker.C {
			gameSystem.UpdateLogic()

			snapshot := gameSystem.GetSnapshot()
			message := NewOutgoingMessage(STATE, snapshot)
			wm.Broadcast(message)
		}
	}()
}
