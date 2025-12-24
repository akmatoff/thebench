package application

import (
	"sync"

	"github.com/akmatoff/thebench/domain"
)

type GameSystem struct {
	Game *domain.Game
	mu   sync.RWMutex
}

func NewGameSystem() *GameSystem {
	return &GameSystem{
		Game: domain.NewGame(),
	}
}

func (gs *GameSystem) AddPlayer(p *domain.Player) {
	gs.mu.Lock()
	defer gs.mu.Unlock()
	gs.Game.AddPlayer(p)
}

func (gs *GameSystem) RemovePlayer(id string) {
	gs.mu.Lock()
	defer gs.mu.Unlock()
	gs.Game.RemovePlayer(id)
}

func (gs *GameSystem) PerformAction(playerID string, action domain.Action) error {
	gs.mu.Lock()
	defer gs.mu.Unlock()
	return gs.Game.PerformAction(playerID, action)
}
