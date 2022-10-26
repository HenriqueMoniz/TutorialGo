"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("number-converter");
let nome = "Henrique";
let numero = 123;
let isTrue = true;
console.log(nome);
console.log(numero);
console.log(isTrue);
if (nome == "Henrique")
    nome = "joao";
console.log(nome);
let arraysimple = [1, 2, 3, 4];
let arraynotsimple = [1, "henrique"];
arraysimple.forEach(n => n.toString);
let mySize = 2;
console.log(mySize);
var NumberConverter = require("number-converter").NumberConverter;
var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);
console.log(nc.convert(1234));
console.log(nc.deconvert("MCMXCIX"));
function CalcularSalarioLiquido(salario) {
    if (salario < 700)
        return salario;
    else if (700 < salario && salario < 1500)
        return salario * 0.90;
    return salario * 0.80;
}
console.log(CalcularSalarioLiquido(1000));
let empregado1 = {
    id: 1,
    nome: "Henrique"
};
function kgparapounds(weight) {
    if (typeof (weight) === 'number')
        return weight * 2.2;
    else
        return parseInt(weight) * 2.2;
}
console.log(kgparapounds("22kg"));
//# sourceMappingURL=index.js.map