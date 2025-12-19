package infra

import (
	"sync"

	"github.com/akmatoff/thebench/domain"
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
