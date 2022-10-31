/**
 * Este ficheiro foi a minha função que irá ser utilizada para fazer um pipe customizado onde, recebendo uma string,
 * irá retornar a mesma string mas com upercase alternado
 * EG: stringteste=> StRiNgTeSte
 */

//Sãp inicializadas as variáveis que serão utilizadas
function altUppercase(test: string): string {
    var out: string = ""
    var count: number = 0

    //Percorremos a string dada
    for (var i = 0; i < test.length; i++) {
        //Caso o counter seja par
        if (count % 2 == 0) {
            //adicionamos a letra em upercase para a nova string
            out += test[i].toUpperCase();

            //Aumentamos o count
            count += 1
        }
        //caso o counter não seja par
        else {
            //Adicionamos a letra em lowercase para a nova string
            out += test[i];
            //Aumentamos o count
            count += 1
        }
    }
    return out


}

console.log(altUppercase("stringteste"))

