package domain

import "time"

type Participant struct {
	ID       string
	Role     ParticipantRole
	JoinedAt time.Time
}

type ParticipantRole string

const (
	Sitter  ParticipantRole = "sitter"
	Witness ParticipantRole = "witness"
)

func NewParticipant(id string, role ParticipantRole) *Participant {
	return &Participant{
		ID:       id,
		Role:     role,
		JoinedAt: time.Now(),
	}
}

func NewWitness(id string) *Participant {
	return NewParticipant(id, Witness)
}

func NewSitter(id string) *Participant {
	return NewParticipant(id, Sitter)
}

func (p *Participant) IsWitness() bool {
	return p.Role == Witness
}

func (p *Participant) IsSitter() bool {
	return p.Role == Sitter
}
