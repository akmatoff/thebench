package dto

type BenchState struct {
	ID           string          `json:"id"`
	WitnessCount int             `json:"witnessCount"`
	Sitters      [2]*Participant `json:"sitters"`
	IsTaken      bool            `json:"isTaken"`
	Atmosphere   Atmosphere      `json:"atmosphere"`
	LastGesture  *Gesture        `json:"lastGesture"`
}

type Gesture struct {
	Type        string `json:"type"`
	AuthorID    string `json:"authorId"`
	PerformedAt string `json:"performedAt"`
}

type Participant struct {
	ID       string `json:"id"`
	Role     string `json:"role"`
	JoinedAt string `json:"joinedAt"`
}

type Atmosphere struct {
	Lighting  string `json:"lighting"`
	TimeOfDay string `json:"timeOfDay"`
}

type Event struct {
	Type string `json:"type"`
	Data any    `json:"data"`
}
