package domain

import "github.com/akmatoff/thebench/common"

type Bench struct {
	ID            string
	WitnessCount  int
	Sitters       [2]*Player
	IsTaken       bool
	LastGesture   *Gesture
	Position      common.Position
	SeatPositions [2]common.Position
	SeatRadius    float64
}

func NewBench() *Bench {
	return &Bench{
		ID:           "the-bench",
		WitnessCount: 0,
		IsTaken:      false,
		Sitters:      [2]*Player{nil, nil},
		LastGesture:  nil,
		Position:     common.Position{X: WorldWidth / 2},
		SeatPositions: [2]common.Position{
			{X: WorldWidth/2 - 100},
			{X: WorldWidth/2 + 100},
		},
		SeatRadius: 416,
	}
}

func (b *Bench) CanSit() bool {
	return b.Sitters[0] == nil || b.Sitters[1] == nil
}
