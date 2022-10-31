import random from "random"


/**
 * Este ficheiro foi criado para explorar as possibilidades da herança de typescript.
 * Neste caso temos a super class Animal e a child class tigre que extende a primeira
 * A classe animal tem vários atributos, nomeadamente nome, alimentação, vivo e energia
 * 
 * this.nome : string. O nome do animal
 * 
 * this.alimentação: string array. Uma lista que contém todos os alimentos do animal
 * 
 * this.vivo:bool que irá dizer se o animal está vivo ou morto
 * 
 * this.energia:number. Quantidade de energia que o animal tem atualmente, 
 *  esta diminui quando o animal tenta procurar algo para comer e aumenta quando dorme
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

    // O método getName() é utilizado para ir buscar o nome do animal
    getName(): string {
        return this.nome;
    }

    // O método getAlimentacao() é utilizado para ir buscar a lista com todos os alimentos que o animal pode comer
    getAlimentacao(): string {
        return "O menu deste animal é: " + this.alimentacao;
    }

    // O método getEnergia() é utilizado para ir buscar a energia atual do animel
    getEnergia(): string {
        return "O animal atualmente tem " + this.energia + " /100 pontos de energia ";
    }

    // O método setName() é utilizado para alterar o nome do animal, dado um nome pelo utilizador
    setName(nome: string): string {
        this.nome = nome;
        return "O novo nome do animal é " + this.nome;
    }

    // O método dormir() é utilizado para adicionar energia ao animal, primeiro vendo a energia atual de modo a não exceder o limite
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

    /**
     * A função mais importante da classe, esta é uma tentativa para o animal apanhar alguma comida, dado o número de tentativas,
     * sendo que a percentagem de sucesso é 20%.
     * primeiro são inicializadas as variáveis que irão ser utilizadas:
     * 
     * sucesso: Boolean, irá ser true caso o animal consiga encontrar comida durante alguma das suas tentativas
     * percentagemSucesso: A percentagem de sucesso que o animal tem de encontrar conida em cada tentativa
     * count: Um counter simples que irá ser utilizado para calcular a quantitade de energia que o animal perdeu
     * comido: A peça de comida que foi escolhida aleatóriamente e que irá ser mostrada na consola
     * 
     * Após inicializar as variáveis percorremos o número de tentativas dado e para cada um verificamos se o animal gastou toda a energia(morreu),
     * também fazemos random de um número e caso seja menor que a percentagem de sucesso quer dizer que o animal conseguiu comer e pára o ciclo 
     * retornando a peça de comida encontrada, quantas tentativas levou e quanta energia perdeu
     * 
     * Caso o animal não encontre algo irá apenas retornar a energia perdida.
     */
    tentarComer(numerodetentativas: number) {
        var sucesso: boolean = false;
        var percentagemSucesso: number = 0.20;
        var count:number = 0;
        for (var i = 0; i < numerodetentativas; i++) {
            count += 1;
            if (count * 10 > this.energia) {
                this.vivo = false;
                return "O animal esgotou todas as suas energias e acabou por morrer"
            }
            else if (random.int(0, 100) < percentagemSucesso * 100) {
                var comido:string = this.alimentacao[random.int(0, this.alimentacao.length - 1)]
                this.energia -= count * 10
                return "O animal comeu um " + comido + " após " + count + " tentativas. \nGastou " + count * 10 + " pontos de energia. \nSobreviveu mais um dia."
            }
        }
        this.energia -= count * 10
        return "O animal não conseguiu encontrar nada para comer e acabou por perder " + count * 10 + " pontos de energia"

    }
}


//Inicializar um novo animal
var animal = new Animal("Crocodilo", ["Zebra", "Gazela", "Carpa", "Galinha"])
