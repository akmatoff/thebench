package infra

import (
	"reflect"
	"sync"
)

type EventHandler func(event any)

type EventBus struct {
	mu       sync.RWMutex
	handlers map[string][]EventHandler
}

func NewEventBus() *EventBus {
	return &EventBus{
		handlers: make(map[string][]EventHandler),
	}
}

func (eb *EventBus) Subscribe(eventType interface{}, handler EventHandler) {
	eb.mu.Lock()
	defer eb.mu.Unlock()

	typeName := reflect.TypeOf(eventType).String()
	eb.handlers[typeName] = append(eb.handlers[typeName], handler)
}

func (eb *EventBus) Publish(event interface{}) {
	eb.mu.RLock()
	defer eb.mu.RUnlock()

	typeName := reflect.TypeOf(event).String()
	for _, handler := range eb.handlers[typeName] {
		handler(event)
	}
}
