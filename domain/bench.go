package domain

import (
	"github.com/akmatoff/thebench/errors"
)

type Bench struct {
	ID           string
	WitnessCount int
	Sitters      [2]*Player
	IsTaken      bool
	LastGesture  *Gesture
}

func NewBench() *Bench {
	return &Bench{
		ID:           "the-bench",
		WitnessCount: 0,
		IsTaken:      false,
		Sitters:      [2]*Player{nil, nil},

		LastGesture: nil,
	}
}

func (b *Bench) CanSit() bool {
	return b.Sitters[0] == nil || b.Sitters[1] == nil
}

func (b *Bench) Sit(p *Player) error {
	if !b.CanSit() {
		return errors.ErrBenchFull
	}

	if b.Sitters[0] == nil {
		b.Sitters[0] = p
	} else {
		b.Sitters[1] = p
	}

	b.IsTaken = true

	return nil
}

func (b *Bench) Leave(id string) {
	for i, sitter := range b.Sitters {
		if sitter != nil && sitter.ID == id {
			b.Sitters[i] = nil
		}
	}

	b.IsTaken = b.Sitters[0] != nil || b.Sitters[1] != nil
}

func (b *Bench) RecordGesture(g *Gesture) {
	b.LastGesture = g
}
