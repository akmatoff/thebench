package domain

type Event struct {
	Type string
	Data any
}

type EventPublisher interface {
	Publish(event Event)
}
