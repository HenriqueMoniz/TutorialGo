import { Animal } from "./animal"
var rl = require('readline-sync');
class Tigre extends Animal {
    private especie: string;

    constructor(nome: string, alimentacao: string[], especie: string) {
        super(nome, alimentacao);
        this.especie = especie
    }

    getEspecie() {
        return this.especie
    }
}

const tigre = new Tigre("Henrique", ["Veado", "Javali", "Vaca", "Cavalo", "Cabra"], "Tigre-de-Bengala")
console.log("Foi criado um tigre e ele está vivo")



while (tigre.vivo) {
    var choice = rl.question('O que deseja fazer? \n1: Ver a especie.\n2: Ver o nome.\n3: Alterar o nome.\n4: Ver a energia dele.\n5: Fazer-lo dormir.\n6: Fazer-lo tentar comer algo\nOUTRO:Terminar o programa\n\nResposta: ');
    console.log("")
    switch (choice.toLowerCase()) {
        case '1':
            console.log(tigre.getEspecie() + "\n")
            break;
        case '2':
            console.log(tigre.getName() + "\n")
            break;
        case '3':
            var answer = rl.question("Que nome deseja para o tigre? ");
            console.log(tigre.setName(answer) + "\n")
            break;
        case '4':
            console.log(tigre.getEnergia() + "\n")
            break;
        case '5':
            console.log(tigre.dormir() + "\n")
            break;

        case '6':
            answer = rl.question("Quantas vezes quer que o animal tente cacar? (1 tentativa = 10 energia): ")
            console.log(tigre.tentarComer(parseInt(answer)) + "\n")
            break;
        default:
            console.log('Terminou o programa\n');
            tigre.vivo = false;

    }
}

