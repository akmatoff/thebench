package infra

import (
	"encoding/json"

	"github.com/akmatoff/thebench/errors"
)

type ActionMessage struct {
	Action string `json:"action"`
}

type PingMessage struct{}

type ConnectedMessage struct {
	PlayerID string `json:"playerId"`
}

type OutgoingMessage struct {
	Type    string      `json:"type"`
	Payload interface{} `json:"payload"`
}

type MessageType string

const (
	PING      MessageType = "PING"
	PONG      MessageType = "PONG"
	ACTION    MessageType = "ACTION"
	CONNECTED MessageType = "CONNECTED"
	STATE     MessageType = "STATE"
)

func NewOutgoingMessage(t MessageType, p interface{}) OutgoingMessage {
	return OutgoingMessage{
		Type:    string(t),
		Payload: p,
	}
}

func parsePayload(raw []byte, target interface{}) error {
	var wrapper struct {
		Payload json.RawMessage `json:"payload"`
	}
	if err := json.Unmarshal(raw, &wrapper); err != nil {
		return err
	}
	return json.Unmarshal(wrapper.Payload, target)
}

func ParseIncomingMessage(data []byte) (interface{}, error) {
	var typeWrapper struct {
		Type string `json:"type"`
	}

	if err := json.Unmarshal(data, &typeWrapper); err != nil {
		return nil, errors.ErrFailedToParse
	}

	switch MessageType(typeWrapper.Type) {
	case "PING":
		return PingMessage{}, nil
	case "ACTION":
		var message ActionMessage
		if err := parsePayload(data, &message); err != nil {
			return nil, errors.ErrFailedToParseAction
		}

		return message, nil
	default:
		return nil, errors.ErrUnknownMessageType
	}
}
