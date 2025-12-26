package application

import (
	"sync"
	"time"

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

func (gs *GameSystem) GetSnapshot() GameState {
	gs.mu.RLock()
	defer gs.mu.RUnlock()

	playersDTO := make(map[string]PlayerDTO, len(gs.Game.Players))

	for id, player := range gs.Game.Players {
		playersDTO[id] = PlayerDTO{
			ID:    player.ID,
			Role:  string(player.Role),
			State: string(player.State),
		}
	}

	var sittersIDs []string

	for _, p := range gs.Game.Bench.Sitters {
		if p != nil {
			sittersIDs = append(sittersIDs, p.ID)
		}
	}

	var lastGestureDTO *GestureDTO

	if gesture := gs.Game.Bench.LastGesture; gesture != nil {
		lastGestureDTO = &GestureDTO{
			Type:        string(gesture.Type),
			AuthorID:    gesture.AuthorID,
			PerformedAt: gesture.PerformedAt.Format(time.RFC3339),
		}
	}

	gs.Game.UpdateWitnessCount()

	return GameState{
		Players: playersDTO,
		Bench: BenchDTO{
			ID:           gs.Game.Bench.ID,
			IsTaken:      gs.Game.Bench.IsTaken,
			Sitters:      sittersIDs,
			WitnessCount: gs.Game.Bench.WitnessCount,
			LastGesture:  lastGestureDTO,
		},
	}
}
