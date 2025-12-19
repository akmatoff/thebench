package domain

import "time"

type Gesture struct {
	Type        string
	AuthorID    string
	PerformedAt time.Time
}

func NewGesture(t string, a string) *Gesture {
	return &Gesture{
		Type:        t,
		AuthorID:    a,
		PerformedAt: time.Now(),
	}
}
