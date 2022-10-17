package main

import (
	"example/hello/greetings"
	"fmt"
	"log"
)

func main() {
	log.SetPrefix("greetings: ")
	log.SetFlags(0)

	//lista de nomes
	names := []string{"Henrique", "João", "Manuel"}

	// Chama a função Hellos que irá receber nomes e dar dar um cumprimento para cada elemento da lista de nomes
	messages, err := greetings.Hellos(names)

	// Caso ocorra um erro dá log desse erro
	if err != nil {
		log.Fatal(err)
	}

	// Dá print de cada cumprimento, juntamente com o nome correspondente
	for _, name := range messages {
		fmt.Println(name)

	}

}
