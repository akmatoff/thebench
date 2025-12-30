package errors

import "errors"

var ErrBenchFull = errors.New("bench is full")
var ErrAlreadySitting = errors.New("player already sitting")
var ErrPlayerNotFound = errors.New("player not found")
var ErrInvalidGesture = errors.New("invalid gesture")
var ErrUnknownAction = errors.New("unknown action")
var ErrNotSitter = errors.New("not a sitter")

var ErrFailedToParse = errors.New("failed to parse")
var ErrUnknownMessageType = errors.New("unknown message type")

var ErrFailedToParseAction = errors.New("failed to parse action")

func Is(err error, target error) bool {
	return errors.Is(err, target)
}
