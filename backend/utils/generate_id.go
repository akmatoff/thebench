package utils

import gonanoid "github.com/matoous/go-nanoid/v2"

const alphabet string = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

func GenerateID() string {
	id, err := gonanoid.Generate(alphabet, 8)

	if err != nil {
		return ""
	}

	return id
}
