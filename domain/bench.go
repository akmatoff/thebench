package domain

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
		LastGesture:  nil,
	}
}

func (b *Bench) CanSit() bool {
	return b.Sitters[0] == nil || b.Sitters[1] == nil
}
