package main

import (
	_ "fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

// role representa informação da pessoa correspondente
type role struct {
	ID   string `json:"id"`
	Name string `json:"nome"`
	Role string `json:"role"`
}

var roles = []role{
	{ID: "1", Name: "Henrique Moniz", Role: "Software Engineer Introduction Project"},
	{ID: "2", Name: "Beatriz Rodrigues", Role: "Software Engineer Introduction Project"},
	{ID: "3", Name: "José Ferrão", Role: "Software Engineer Asset Management"},
	{ID: "4", Name: "Ricardo Coelho", Role: "Product Owner"},
	{ID: "5", Name: "Nelson Campos", Role: "Software Engineer Assest Management"},
	{ID: "6", Name: "Romeu Temudo", Role: "Software Engineer Assest Management"},
	{ID: "7", Name: "Johnny Silva", Role: "Software Engineer Safety Tools"},
	{ID: "8", Name: "Cristiane Franco", Role: "UI/UX"},
}

func main() {
	//for key, element := range employee {
	//fmt.Println("Key:", key, "=>", "Element:", element)
	//}
	router := gin.Default()
	router.GET("/roles", getRoles)
	router.POST("/roles", postRoles)

	router.Run("localhost:8080")
}

// getRoles responde com a lista de todas as pessoas em formato json
func getRoles(c *gin.Context) {
	c.IndentedJSON(http.StatusOK, roles)
}

// postRoles adiciona um certo json aos roles
func postRoles(c *gin.Context) {
	var newRole role

	if err := c.BindJSON(&newRole); err != nil {
		return
	}

	// Adiciona o novo role á lista
	roles = append(roles, newRole)
	c.IndentedJSON(http.StatusCreated, newRole)
}
