package greetings

import (
	"errors"
	"fmt"
	"math/rand"
	"time"
)

func init() {
	rand.Seed(time.Now().UnixNano())
}

// Hello retorna um cumprimento para cada nome
func Hello(name string) (string, error) {

	// Caso não tenha um nome
	if name == "" {
		return "", errors.New("empty name")
	}

	// Chama a função randomFormat
	message := fmt.Sprintf(randomFormat(), name)
	return message, nil

}

// Função que recebe uma lista de nomes e chama a função "hello" para cada um
func Hellos(names []string) (map[string]string, error) {
	messages := make(map[string]string)

	// Percorre o map de nomes e chama a função "Hello" para cada um
	for _, name := range names {
		message, err := Hello(name)
		if err != nil {
			return nil, err
		}

		messages[name] = message
	}
	return messages, nil
}

// Escolhe um formato random de uma lista de formatos
func randomFormat() string {
	formats := []string{
		"Hello, %v, welcome to EQSDigital",
		"Buongiorno, %v",
		"Não sei o que meter mais aqui, %v",
	}

	return formats[rand.Intn(len(formats))]
}
