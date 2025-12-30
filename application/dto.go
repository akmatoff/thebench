package application

type GameState struct {
	Players map[string]PlayerDTO `json:"players"`
	Bench   BenchDTO             `json:"bench"`
}

type PlayerDTO struct {
	ID       string            `json:"id"`
	Role     string            `json:"role"`
	State    string            `json:"state"`
	Position PlayerPositionDTO `json:"position"`
}

type PlayerPositionDTO struct {
	X float64 `json:"x"`
}

type BenchDTO struct {
	ID           string      `json:"id"`
	IsTaken      bool        `json:"isTaken"`
	Sitters      []string    `json:"sitters"`
	WitnessCount int         `json:"witnessCount"`
	LastGesture  *GestureDTO `json:"lastGesture,omitempty"`
}

type GestureDTO struct {
	Type        string `json:"type"`
	AuthorID    string `json:"authorId"`
	PerformedAt string `json:"performedAt"`
}
