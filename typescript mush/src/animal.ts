import random from "random"

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
                return "O animal esgotou todas as suas energias e acabou por morrer"
            }
            else if (random.int(0, 100) < percentagemSucesso * 100) {
                var comido = this.alimentacao[random.int(0, this.alimentacao.length - 1)]
                this.energia -= count * 10
                return "O animal comeu um " + comido + " após " + count + " tentativas. \nGastou " + count * 10 + " pontos de energia. \nSobreviveu mais um dia."
            }
        }

        return "O animal não conseguiu encontrar nada para comer e acabou por perder " + count * 10 + " pontos de energia"

    }
}

var animal = new Animal("Crocodilo", ["Zebra", "Gazela", "Carpa", "Galinha"])
