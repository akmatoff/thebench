package websocket

type IncommingMessage struct {
	Action string `json:"action"`
}

type OutgoingMessage = any
