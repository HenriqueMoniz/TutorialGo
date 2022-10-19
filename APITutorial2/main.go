package main

import (
	"database/sql"
	"fmt"

	_ "github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

type role struct {
	ID   string `json:"id"`
	Name string `json:"nome"`
	Role string `json:"role"`
}

var roles = []role{
	{ID: "1", Name: "Henrique Moniz", Role: "Software Engineer IP"},
	{ID: "2", Name: "Beatriz Rodrigues", Role: "Software Engineer IP"},
	{ID: "3", Name: "José Ferrão", Role: "Software Engineer AM"},
	{ID: "4", Name: "Ricardo Coelho", Role: "Product Owner"},
	{ID: "5", Name: "Nelson Campos", Role: "Software Engineer AM"},
	{ID: "6", Name: "Romeu Temudo", Role: "Software Engineer AM"},
	{ID: "7", Name: "Johnny Silva", Role: "Software Engineer ST"},
	{ID: "8", Name: "Cristiane Franco", Role: "UI/UX"},
}

// empty database on launch and add the above to table
// make it so the above is only to enter the db, do inserts for db, add post requests and change it into another thing like above
func main() {
	//Este ficheiro abre a base de dados mySQL, apaga todas as linhas existentes de modo a poder
	//
	//
	db, err := sql.Open("mysql", "root:drspeed7@tcp(127.0.0.1:3306)/testschema")

	// Caso tenha algum erro
	if err != nil {
		panic(err.Error())
	}

	// Faz com que atrase o fecho até a função main acabar
	defer db.Close()

	// Dar reset no conteudo já existente na base de dados
	//Isto foi feito apenas para experimentar código
	delete, err := db.Query("DELETE FROM test")

	// Mais um check de erros
	if err != nil {
		panic(err.Error())
	}
	defer delete.Close()

	// Adicionar valores á base de dados
	for i := 0; i < len(roles); i++ {
		fmt.Println(roles[i].Name)
		//Insere os valores acima na base de dados
		insert, err := db.Query("INSERT INTO test VALUES ( '" + roles[i].ID + "','" + roles[i].Name + "','" + roles[i].Role + "')")

		//Verifica se existem erros
		if err != nil {
			panic(err.Error())
		}
		defer insert.Close()

	}

	fmt.Println("End of File")

}
