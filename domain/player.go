package domain

import "time"

type PlayerRole string

type PlayerState string

const (
	StateIdle    PlayerState = "idle"
	StateSmoking PlayerState = "smoking"
)

const (
	Sitter  PlayerRole = "sitter"
	Witness PlayerRole = "witness"
)

type Player struct {
	ID       string
	Role     PlayerRole
	JoinedAt time.Time
	State    PlayerState
}

func NewPlayer(id string, role PlayerRole) *Player {
	return &Player{
		ID:       id,
		Role:     role,
		JoinedAt: time.Now(),
	}
}

func NewWitness(id string) *Player {
	return NewPlayer(id, Witness)
}

func NewSitter(id string) *Player {
	return NewPlayer(id, Sitter)
}

func (p *Player) IsWitness() bool {
	return p.Role == Witness
}

func (p *Player) IsSitter() bool {
	return p.Role == Sitter
}
