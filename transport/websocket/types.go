package websocket

type IncommingMessage struct {
	Type    string `json:"type"`
	Payload any    `json:"payload"`
}

type OutgoingMessage = any
