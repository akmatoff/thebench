package domain

import "time"

type Gesture struct {
	Type        Action
	AuthorID    string
	PerformedAt time.Time
}

func NewGesture(t Action, a string) *Gesture {
	return &Gesture{
		Type:        t,
		AuthorID:    a,
		PerformedAt: time.Now(),
	}
}
