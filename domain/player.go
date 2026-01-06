package domain

import (
	"time"

	"github.com/akmatoff/thebench/common"
)

type PlayerRole string

type PlayerState string

type PlayerFacing string

const (
	FacingLeft  PlayerFacing = "left"
	FacingRight PlayerFacing = "right"
)

const (
	StateIdle            PlayerState = "idle"
	StateSitting         PlayerState = "sitting"
	StateSittingSmoking  PlayerState = "sitting_smoking"
	StateStandingSmoking PlayerState = "standing_smoking"
	StateWalking         PlayerState = "walking"
	StateWalkingSmoking  PlayerState = "walking_smoking"
)

const (
	Sitter  PlayerRole = "sitter"
	Witness PlayerRole = "witness"
)

type Player struct {
	ID         string
	Role       PlayerRole
	JoinedAt   time.Time
	State      PlayerState
	Position   common.Position
	Facing     PlayerFacing
	LastMoveAt time.Time
}

func NewPlayer(id string, role PlayerRole) *Player {
	return &Player{
		ID:         id,
		Role:       role,
		JoinedAt:   time.Now(),
		State:      StateIdle,
		Position:   common.Position{X: 10},
		Facing:     FacingRight,
		LastMoveAt: time.Now(),
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
