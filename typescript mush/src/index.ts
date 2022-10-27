import "number-converter"

//variáveis simples
let nome: string ="Henrique";
let numero: number =123;
let isTrue: boolean = true;

//apenas pode ser os valores indicados
let numeroEspecifico:50|100;
numeroEspecifico = 50;

console.log(nome);
console.log(numero);
console.log(isTrue);

// Alterar um valor se a condição for cumprida
if(nome =="Henrique")
    nome ="joao"
    console.log(nome);

// Array simples
let arraysimple: number[]=[1,2,3,4];

// Array com "id" e "nome"
let arraynotsimple: [number,string]=[1,"henrique"];

arraysimple.forEach( n => n.toString )

//usando const no enum irá dar código mais eficiente
const enum Size {Small=1, Medium, Large}
let mySize:Size = Size.Medium;
console.log(mySize)




//Usando o number-converter importado
var NumberConverter = require("number-converter").NumberConverter;

//Criar um novo objeto do tipo NumberConverter
var nc = new NumberConverter(NumberConverter.DECIMAL, NumberConverter.ROMAN_NUMERAL);
console.log(nc.convert(1234)); 
console.log(nc.deconvert("MCMXCIX")); 

//teste de função que calcula o salário após os impostos(ficticios)
function CalcularSalarioLiquido(salario:number): number{
    if (salario<700)
        return salario
    else if (700<salario && salario<1500)
        return salario*0.90
    return salario*0.80
}
console.log(CalcularSalarioLiquido(1000))


type Empregado={
    readonly id:number,
    nome:string
}
let empregado1:Empregado = {
    id:1,
    nome:"Henrique"
    }

//Função que transforma de kg em pounds(Usa)
function kgparapounds(weight: number | string): number{
    if (typeof(weight)==='number')
        return weight*2.2;
    else
    return parseInt(weight)*2.2;
}

console.log(kgparapounds("22kg"))



