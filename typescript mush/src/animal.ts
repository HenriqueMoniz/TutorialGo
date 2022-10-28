import random from "random"


/**
 * Este ficheiro foi criado para explorar as possibilidades da herança de typescript.
 * Neste caso temos a super class Animal e a child class tigre que extende a primeira
 * A classe animal tem vários atributos, nomeadamente nome, alimentação, vivo e energia
 * this.nome : string. O nome do animal
 * this.alimentação: string array. Uma lista que contém todos os alimentos do animal
 * this.vivo:bool que irá dizer se o animal está vivo ou morto
 * this.energia:number. Quantidade de energia que o animal tem atualmente, esta diminui quando o animal tenta procurar algo para comer e aumenta quando dorme
 * 
 * inserir métodos aqui
 */
export class Animal {
    nome: string;
    alimentacao: string[];
    vivo: boolean;
    energia: number;

    constructor(nome: string, alimentacao: string[]) {

        this.nome = nome;
        this.alimentacao = alimentacao;
        this.vivo = true;
        this.energia = 100;
    }


    getName(): string {
        return this.nome;
    }

    getAlimentacao(): string {
        return "O menu deste animal é: " + this.alimentacao;
    }

    getEnergia(): string {
        return "O animal atualmente tem " + this.energia + " /100 pontos de energia ";
    }

    setName(nome: string): string {
        this.nome = nome;
        return "O novo nome do animal é " + this.nome;
    }

    dormir(): string {
        if (this.energia == 100) {
            return "O animal não precisa de dormir";
        }

        else if (this.energia > 50) {
            this.energia = 100;
        }

        else {
            this.energia += 50;
        }
        return "O animal adormeceu e recuperou energia";
    }

    tentarComer(numerodetentativas: number) {
        var sucesso: boolean = false;
        var percentagemSucesso: number = 0.20;
        var count = 0;
        for (var i = 0; i < numerodetentativas; i++) {
            count += 1;
            if (count * 10 > this.energia) {
                this.vivo = false;
                // energia
                return "O animal esgotou todas as suas energias e acabou por morrer"
            }
            else if (random.int(0, 100) < percentagemSucesso * 100) {
                var comido = this.alimentacao[random.int(0, this.alimentacao.length - 1)]
                this.energia -= count * 10
                return "O animal comeu um " + comido + " após " + count + " tentativas. \nGastou " + count * 10 + " pontos de energia. \nSobreviveu mais um dia."
            }
        }
        this.energia -= count * 10
        return "O animal não conseguiu encontrar nada para comer e acabou por perder " + count * 10 + " pontos de energia"

    }
}

var animal = new Animal("Crocodilo", ["Zebra", "Gazela", "Carpa", "Galinha"])
