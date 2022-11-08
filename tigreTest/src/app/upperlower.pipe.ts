import { Pipe,PipeTransform} from "@angular/core";

@Pipe({name: 'altupper'})
export class altupper implements PipeTransform {

    transform(string:string): string {
        var out: string = ""
        var count: number = 0
    
        //Percorremos a string dada
        for (var i = 0; i < string.length; i++) {
            //Caso o counter seja par
            if (count % 2 == 0) {
                //adicionamos a letra em upercase para a nova string
                out += string[i].toUpperCase();
    
                //Aumentamos o count
                count += 1
            }
            //caso o counter não seja par
            else {
                //Adicionamos a letra em lowercase para a nova string
                out += string[i];
                //Aumentamos o count
                count += 1
            }
        }
        return out
      }
        
    }
