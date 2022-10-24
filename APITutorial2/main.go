package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
	_ "github.com/go-sql-driver/mysql"
)

var tokn = []byte("tokenvalue")
var apikey = "1234"

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

	http.Handle("/api", validateJwt(Home))
	http.HandleFunc("/jwt", getJwt)
	//http.HandleFunc("/get", getRoles)
	//http.HandleFunc("/post", postRoles)
	http.ListenAndServe(":8080", nil)

	//Routes para os pedidos HTTP

	fmt.Println("End of File")

}

func getRoles(c *gin.Context) {

	c.IndentedJSON(http.StatusOK, roles)
	//abre base de dados
	db, err := sql.Open("mysql", "root:drspeed7@tcp(127.0.0.1:3306)/testschema")

	//Verifica que não ocorreram erros
	if err != nil {
		panic(err.Error())
	}

	//Adia o fecho da base de dades até a função terminar
	defer db.Close()

	//Vai buscar todas as linhas da tabela
	results, err := db.Query("SELECT * FROM test")

	//Verifica se existem erros
	if err != nil {
		panic(err.Error())
	}

	//Vai linha a linha na tabela sql e dá print de cada uma
	for results.Next() {
		var test role
		err = results.Scan(&test.ID, &test.Name, &test.Role)

		//Verifica novamente se tem algum erro
		if err != nil {
			panic(err.Error())
		}

		fmt.Println(test.ID, test.Name, test.Role)
	}

	defer results.Close()
}

// postRoles adiciona um certo json aos roles
func postRoles(c *gin.Context) {
	var newRole role

	if err := c.BindJSON(&newRole); err != nil {
		return
	}

	/*fmt.Println("IN POST BEFORE JSON PRINT")
	/*fmt.Println(newRole.ID)
	fmt.Println(newRole.Name)
	fmt.Println(newRole.Role)
	fmt.Println("IN POST AFTER JSONPRINT")*/

	//Abre a base de dados
	db, err := sql.Open("mysql", "root:drspeed7@tcp(127.0.0.1:3306)/testschema")

	//Verifica erros
	if err != nil {
		panic(err.Error())
	}

	//Adia o fecho até terminar a função
	defer db.Close()

	//Insere os valores do post na base de dados
	insert, err := db.Query("INSERT INTO test VALUES ( '" + newRole.ID + "','" + newRole.Name + "','" + newRole.Role + "')")

	//Verifica se existem erros
	if err != nil {
		panic(err.Error())
	}

	//Adia o fecho até o fim da função
	defer insert.Close()

	// Adiciona o novo role á lista neste ficheiro
	roles = append(roles, newRole)
	c.IndentedJSON(http.StatusCreated, newRole)
}

func Home(w http.ResponseWriter, r *http.Request) {
	router := gin.Default()

	router.GET("/roles", getRoles)
	router.POST("/roles", postRoles)

	router.Run("localhost:8081")

}

func getJwt(w http.ResponseWriter, r *http.Request) {
	if r.Header["Access"] != nil {
		if r.Header["Access"][0] != apikey {
			return

		} else {
			token, err := createJwt()
			if err != nil {
				return
			}
			fmt.Fprint(w, token)

		}
	}
}

func createJwt() (string, error) {
	token := jwt.New(jwt.SigningMethodHS256)

	claims := token.Claims.(jwt.MapClaims)

	claims["exp"] = time.Now().Add(time.Hour).Unix()

	tokenStr, err := token.SignedString(tokn)

	if err != nil {
		fmt.Println(err.Error())
		return "", err
	}

	return tokenStr, nil
}

func validateJwt(next func(w http.ResponseWriter, r *http.Request)) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {

		if r.Header["Token"] != nil {
			token, err := jwt.Parse(r.Header["Token"][0], func(t *jwt.Token) (interface{}, error) {
				_, ok := t.Method.(*jwt.SigningMethodHMAC)
				if !ok {
					w.WriteHeader(http.StatusUnauthorized)
					w.Write([]byte("Not Authorized"))
				}
				return tokn, nil
			})

			if err != nil {
				w.WriteHeader(http.StatusUnauthorized)
				w.Write([]byte("Not Authorized" + err.Error()))

			}

			if token.Valid {
				next(w, r)
			}
		} else {
			w.WriteHeader(http.StatusUnauthorized)
			w.Write([]byte("Not Authorized"))
		}
	})

}
