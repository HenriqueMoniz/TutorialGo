#!/usr/bin/bash
#comentário

#print simples
STRING="Conteudo da string"
echo $STRING

function bash {
 local STRING="string local"
 echo $STRING
 }

bash

#ciclo for
#para vir aqui basta fazer ./test.sh "variáveis aqui para percorrer o for"
for arg1 in "$@"
do
echo $arg1
done


#dar print de um nome dado
echo "insere nome: "
read name
if [ $name ]; then
	echo "$name é um bom nome"
else
	echo "não tem nome"
fi
