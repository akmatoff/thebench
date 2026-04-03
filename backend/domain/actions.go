package domain

type Action string

const (
	ActionSit            Action = "sit"
	ActionLeave          Action = "leave"
	ActionSmoke          Action = "smoke"
	ActionStopSmoking    Action = "stop_smoking"
	ActionWave           Action = "wave"
	ActionPat            Action = "pat"
	ActionTakeDrag       Action = "take_drag"
	ActionMoveLeftStart  Action = "move_left_start"
	ActionMoveLeftStop   Action = "move_left_stop"
	ActionMoveRightStart Action = "move_right_start"
	ActionMoveRightStop  Action = "move_right_stop"
)
