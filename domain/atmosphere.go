package domain

import "time"

type Atmosphere struct {
	Lighting  string
	TimeOfDay time.Time
}

type LightingPhase string

const (
	Day   LightingPhase = "day"
	Night LightingPhase = "night"
	Dawn  LightingPhase = "dawn"
	Dusk  LightingPhase = "dusk"
)

func NewAtmosphere(l string, t time.Time) *Atmosphere {
	return &Atmosphere{
		Lighting:  l,
		TimeOfDay: t,
	}
}

func NewDayAtmosphere(t time.Time) *Atmosphere {
	return NewAtmosphere(string(Day), t)
}

func NewNightAtmosphere(t time.Time) *Atmosphere {
	return NewAtmosphere(string(Night), t)
}

func NewDawnAtmosphere(t time.Time) *Atmosphere {
	return NewAtmosphere(string(Dawn), t)
}

func NewDuskAtmosphere(t time.Time) *Atmosphere {
	return NewAtmosphere(string(Dusk), t)
}

func (a *Atmosphere) IsDay() bool {
	return a.Lighting == string(Day)
}

func (a *Atmosphere) IsNight() bool {
	return a.Lighting == string(Night)
}

func (a *Atmosphere) IsDawn() bool {
	return a.Lighting == string(Dawn)
}

func (a *Atmosphere) IsDusk() bool {
	return a.Lighting == string(Dusk)
}
