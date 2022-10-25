#!/usr/bin/bash

numbers=("1" "5" "8" "2" "9" "4" "5" "0" "3" "6")
out=()
echo "array inicial não ordenado"
echo ${numbers[*]}
echo ""

for i in "${numbers[@]}"
    do
    min=20
    for j in "${numbers[@]}"
        do
        #echo "j: $j"
        if ((j<min))
            then
            #echo "infirstif"
            #echo $min
            #echo ${out[*]}
            if [[  " ${out[*]} " == *"$j"*  ]]
                then
                a=1
            else
                #echo "insecondif, $j"
                min=$j
                #echo $min

            fi
        fi
    done
    out+=($min)


done
echo "array final ordenado"

echo ${out[*]}
