package domain

type Event struct {
	Type    string
	Payload any
}

type EventPublisher interface {
	Publish(event Event)
}
