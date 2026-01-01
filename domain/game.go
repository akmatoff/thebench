package domain

import (
	"github.com/akmatoff/thebench/errors"
)

type Game struct {
	Players map[string]*Player
	Bench   *Bench
}

const MOVEMENT_SPEED = 0.8

func NewGame() *Game {
	return &Game{
		Players: make(map[string]*Player),
		Bench:   NewBench(),
	}
}

func (g *Game) AddPlayer(p *Player) {
	g.Players[p.ID] = p
}

func (g *Game) RemovePlayer(id string) {
	delete(g.Players, id)
}

func (g *Game) GetPlayer(id string) *Player {
	return g.Players[id]
}

func (g *Game) Sit(playerID string) error {
	player := g.Players[playerID]
	if player == nil {
		return errors.ErrPlayerNotFound
	}
	if player.Role == Sitter {
		return errors.ErrAlreadySitting
	}

	if !g.Bench.CanSit() {
		return errors.ErrBenchFull
	}

	if g.Bench.Sitters[0] == nil {
		g.Bench.Sitters[0] = player
	} else {
		g.Bench.Sitters[1] = player
	}

	g.Bench.IsTaken = true

	player.Role = Sitter
	player.State = StateIdle

	return nil
}

func (g *Game) Leave(playerID string) {
	for i, p := range g.Bench.Sitters {
		if p != nil && p.ID == playerID {
			g.Bench.Sitters[i] = nil
		}
	}

	g.Bench.IsTaken = g.Bench.Sitters[0] != nil || g.Bench.Sitters[1] != nil

	if p := g.Players[playerID]; p != nil {
		p.Role = Witness
		p.State = StateIdle
	}
}

func (g *Game) PerformAction(playerID string, action Action) error {
	player := g.Players[playerID]

	if player == nil {
		return errors.ErrPlayerNotFound
	}

	switch action {

	case ActionSmoke:
		if player.Role == Sitter {
			g.RecordGesture(NewGesture(ActionSmoke, playerID))
		}

		player.State = StateSmoking

	case ActionStopSmoking:
		player.State = StateIdle

	case ActionSit:
		return g.Sit(playerID)

	case ActionLeave:
		g.Leave(playerID)

	case ActionWave, ActionPat:
		if player.Role != Sitter {
			return errors.ErrNotSitter
		}
		g.RecordGesture(NewGesture(action, playerID))

	case ActionMoveLeft:
		if player.Role == Sitter {
			return nil
		}

		player.Position.X -= MOVEMENT_SPEED

		if player.Position.X < 0 {
			player.Position.X = 0
		}

	case ActionMoveRight:
		if player.Role == Sitter {
			return nil
		}

		player.Position.X += MOVEMENT_SPEED

	default:
		return errors.ErrUnknownAction
	}

	return nil
}

func (g *Game) RecordGesture(gesture *Gesture) {
	g.Bench.LastGesture = gesture
}

func (g *Game) UpdateWitnessCount() {
	count := 0

	for _, p := range g.Players {
		if p.Role == Witness {
			count++
		}
	}

	g.Bench.WitnessCount = count
}
