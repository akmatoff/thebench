package domain

import "github.com/akmatoff/thebench/errors"

type Game struct {
	Players map[string]*Player
	Bench   *Bench
}

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
	return g.Bench.Sit(player)
}

func (g *Game) Leave(playerID string) {
	g.Bench.Leave(playerID)
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
			g.Bench.RecordGesture(NewGesture(ActionSmoke, playerID))
		}

		player.State = StateSmoking

	case ActionSit:
		return g.Sit(playerID)

	case ActionLeave:
		g.Leave(playerID)

	case ActionWave, ActionPat:
		if player.Role != Sitter {
			return errors.ErrNotSitter
		}
		g.Bench.RecordGesture(NewGesture(action, playerID))

	default:
		return errors.ErrUnknownAction
	}

	return nil
}
