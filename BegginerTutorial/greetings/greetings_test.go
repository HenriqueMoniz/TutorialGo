package greetings

import (
	"regexp"
	"testing"
)

// TestHelloName chama a função "Hello" e verifica se tem return válido
func TestHelloName(t *testing.T) {
	name := "Henrique"
	want := regexp.MustCompile(`\b` + name + `\b`)
	msg, err := Hello("Henrique")
	if !want.MatchString(msg) || err != nil {
		t.Fatalf(`Hello("Henrique") = %q, %v, want match for %#q, nil`, msg, err, want)
	}
}

// TestHelloEmpty Chama hello com um nome vazio
func TestHelloEmpty(t *testing.T) {
	msg, err := Hello("")
	if msg != "" || err == nil {
		t.Fatalf(`Hello("") = %q, %v, want "", error`, msg, err)
	}
}
