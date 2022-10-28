"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Animal = void 0;
const random_1 = __importDefault(require("random"));
class Animal {
    constructor(nome, alimentacao) {
        this.nome = nome;
        this.alimentacao = alimentacao;
        this.vivo = true;
        this.energia = 100;
    }
    getName() {
        return this.nome;
    }
    getAlimentacao() {
        return "O menu deste animal é: " + this.alimentacao;
    }
    getEnergia() {
        return "O animal atualmente tem " + this.energia + " /100 pontos de energia ";
    }
    setName(nome) {
        this.nome = nome;
        return "O novo nome do animal é " + this.nome;
    }
    dormir() {
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
    tentarComer(numerodetentativas) {
        var sucesso = false;
        var percentagemSucesso = 0.20;
        var count = 0;
        for (var i = 0; i < numerodetentativas; i++) {
            count += 1;
            if (count * 10 > this.energia) {
                this.vivo = false;
                return "O animal esgotou todas as suas energias e acabou por morrer";
            }
            else if (random_1.default.int(0, 100) < percentagemSucesso * 100) {
                var comido = this.alimentacao[random_1.default.int(0, this.alimentacao.length - 1)];
                this.energia -= count * 10;
                return "O animal comeu um " + comido + " após " + count + " tentativas. \nGastou " + count * 10 + " pontos de energia. \nSobreviveu mais um dia.";
            }
        }
        this.energia -= count * 10;
        return "O animal não conseguiu encontrar nada para comer e acabou por perder " + count * 10 + " pontos de energia";
    }
}
exports.Animal = Animal;
var animal = new Animal("Crocodilo", ["Zebra", "Gazela", "Carpa", "Galinha"]);
