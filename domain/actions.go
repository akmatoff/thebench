package domain

type Action string

const (
	ActionSit         Action = "sit"
	ActionLeave       Action = "leave"
	ActionSmoke       Action = "smoke"
	ActionStopSmoking Action = "stop_smoking"
	ActionWave        Action = "wave"
	ActionPat         Action = "pat"
)
