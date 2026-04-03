package domain

import (
	"log"
	"time"

	"github.com/akmatoff/thebench/errors"
)

type Game struct {
	Players map[string]*Player
	Bench   *Bench
}

const (
	MOVEMENT_SPEED  = 170
	WALKING_TIMEOUT = 100 * time.Millisecond
)

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
		g.Leave(playerID)

		return nil
	}

	if !g.Bench.CanSit() {
		return errors.ErrBenchFull
	}

	// check if player is near bench with calculation of distance
	if player.Position.X > g.Bench.Position.X+g.Bench.SeatRadius ||
		player.Position.X < g.Bench.Position.X-g.Bench.SeatRadius {
		return errors.ErrPlayerTooFar
	}

	if g.Bench.Sitters[0] == nil {
		g.Bench.Sitters[0] = player
		player.Position.X = g.Bench.SeatPositions[0].X
	} else {
		g.Bench.Sitters[1] = player
		player.Position.X = g.Bench.SeatPositions[1].X
	}

	g.Bench.IsTaken = true
	player.MovementDirection = PlayerMovementDirectionNone

	if player.State == StateStandingSmoking || player.State == StateWalkingSmoking {
		player.State = StateSittingSmoking
	} else {
		player.State = StateSitting
	}

	player.Role = Sitter

	return nil
}

func (g *Game) Leave(playerID string) {
	log.Printf("Player %s leaving bench", playerID)

	for i, p := range g.Bench.Sitters {
		if p != nil && p.ID == playerID {
			g.Bench.Sitters[i] = nil
		}
	}

	g.Bench.IsTaken = g.Bench.Sitters[0] != nil || g.Bench.Sitters[1] != nil

	if p := g.Players[playerID]; p != nil {
		p.Role = Witness
		p.MovementDirection = PlayerMovementDirectionNone

		if p.State == StateSittingSmoking {
			p.State = StateStandingSmoking
		} else {
			p.State = StateIdle
		}
	}
}

func (g *Game) PerformAction(playerID string, action Action) (*Gesture, error) {
	player := g.Players[playerID]

	dragCooldown := 500 * time.Millisecond

	if player == nil {
		return nil, errors.ErrPlayerNotFound
	}

	switch action {

	case ActionSmoke:
		if player.Role == Sitter && player.State == StateSitting {
			player.State = StateSittingSmoking
			g.RecordGesture(NewGesture(ActionSmoke, playerID))
		} else {
			player.State = StateStandingSmoking
			g.RecordGesture(NewGesture(ActionSmoke, playerID))
		}

	case ActionStopSmoking:
		if player.Role == Sitter && player.State == StateSittingSmoking {
			player.State = StateSitting
		} else {
			player.State = StateIdle
		}

	case ActionTakeDrag:
		if player.State != StateSittingSmoking && player.State != StateStandingSmoking {
			return nil, errors.ErrNotSmoking
		}

		if time.Since(player.LastDragAt) < dragCooldown {
			return nil, nil
		}

		player.LastDragAt = time.Now()
		return g.RecordGesture(NewGesture(ActionTakeDrag, playerID)), nil

	case ActionSit:
		g.Sit(playerID)

	case ActionLeave:
		g.Leave(playerID)

	case ActionWave, ActionPat:
		if player.Role != Sitter {
			return nil, errors.ErrNotSitter
		}
		g.RecordGesture(NewGesture(action, playerID))

	case ActionMoveLeftStart:
		log.Printf("Player state while moving: %v", player.State)

		if player.Role == Sitter || player.State == StateSitting || player.State == StateSittingSmoking {
			return nil, nil
		}

		switch player.State {
		case StateStandingSmoking, StateWalkingSmoking:
			player.State = StateWalkingSmoking
		case StateIdle, StateWalking:
			player.State = StateWalking
		}

		player.Facing = FacingLeft
		player.MovementDirection = PlayerMovementDirectionLeft
		player.LastMoveAt = time.Now()

		if player.Position.X < 0 {
			player.Position.X = 0
		}

	case ActionMoveLeftStop:
		if player.MovementDirection == PlayerMovementDirectionLeft {
			player.MovementDirection = PlayerMovementDirectionNone
		}

	case ActionMoveRightStart:
		log.Printf("Player state while moving: %v", player.State)

		if player.Role == Sitter || player.State == StateSitting || player.State == StateSittingSmoking {
			log.Println("Cannot move right while sitting")
			return nil, nil
		}

		switch player.State {
		case StateStandingSmoking, StateWalkingSmoking:
			player.State = StateWalkingSmoking
		case StateIdle, StateWalking:
			player.State = StateWalking
		}

		player.Facing = FacingRight
		player.MovementDirection = PlayerMovementDirectionRight
		player.LastMoveAt = time.Now()

		if player.Position.X > WorldWidth {
			player.Position.X = WorldWidth
		}

	case ActionMoveRightStop:
		if player.MovementDirection == PlayerMovementDirectionRight {
			player.MovementDirection = PlayerMovementDirectionNone
		}

	default:
		return nil, errors.ErrUnknownAction
	}

	return nil, nil
}

func (g *Game) RecordGesture(gesture *Gesture) *Gesture {
	g.Bench.LastGesture = gesture

	return gesture
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

func (g *Game) Update(delta float64) {
	now := time.Now()

	for _, p := range g.Players {
		if p == nil {
			continue
		}

		if p.Role == Sitter || p.State == StateSitting || p.State == StateSittingSmoking {
			p.MovementDirection = PlayerMovementDirectionNone
			continue
		}

		switch p.MovementDirection {
		case PlayerMovementDirectionLeft:
			p.Position.X -= MOVEMENT_SPEED * delta
			p.Facing = FacingLeft
			p.LastMoveAt = now

			if p.State == StateStandingSmoking || p.State == StateWalkingSmoking {
				p.State = StateWalkingSmoking
			} else {
				p.State = StateWalking
			}
		case PlayerMovementDirectionRight:
			p.Position.X += MOVEMENT_SPEED * delta
			p.Facing = FacingRight
			p.LastMoveAt = now

			if p.State == StateStandingSmoking || p.State == StateWalkingSmoking {
				p.State = StateWalkingSmoking
			} else {
				p.State = StateWalking
			}
		default:
			if p.State == StateWalkingSmoking || p.State == StateStandingSmoking {
				p.State = StateStandingSmoking
			} else {
				p.State = StateIdle
			}
		}

		if p.Position.X < 0 {
			p.Position.X = 0
		}

		if p.Position.X > WorldWidth {
			p.Position.X = WorldWidth
		}

	}

}
