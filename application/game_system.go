package application

import (
	"log"
	"sync"
	"time"

	"github.com/akmatoff/thebench/domain"
)

type GameSystem struct {
	Game *domain.Game
	mu   sync.RWMutex
}

func NewGameSystem() *GameSystem {
	gs := &GameSystem{
		Game: domain.NewGame(),
	}

	return gs
}

func (gs *GameSystem) UpdateLogic() {
	gs.mu.Lock()
	defer gs.mu.Unlock()
	gs.Game.Update()

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
	gs.Game.Leave(id)
}

func (gs *GameSystem) PerformAction(playerID string, action domain.Action) error {
	gs.mu.Lock()
	defer gs.mu.Unlock()

	log.Printf("Player %s performing action %s", playerID, action)
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
			Position: PositionDTO{
				X: player.Position.X,
			},
			Facing: string(player.Facing),
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
			SeatRadius:   gs.Game.Bench.SeatRadius,
			SeatPositions: [2]PositionDTO{
				{
					X: gs.Game.Bench.SeatPositions[0].X,
				},
				{
					X: gs.Game.Bench.SeatPositions[1].X,
				},
			},
			Position: PositionDTO{
				X: gs.Game.Bench.Position.X,
			},
		},
	}
}
