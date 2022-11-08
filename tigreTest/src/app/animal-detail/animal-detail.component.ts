import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {RouterModule} from '@angular/router';
import { Animal } from '../animal';
import { AnimalService } from '../animal.service';
import { altupper } from '../upperlower.pipe';
import random from "random"
import { MessageService } from '../message.service';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css'],
  providers: [ altupper ]
})

export class AnimalDetailComponent implements OnInit {
  animal: Animal|undefined;

  constructor(
    private messageService: MessageService,
    private route: ActivatedRoute,
    private animalService: AnimalService,
    private location: Location,
    private altupper:altupper,
  ) { }

  onSubmit(value:string) {

  }

  ngOnInit(): void {
    this.getAnimal()
  }

  ngOnDestroy(): void {
    
  }

  getAnimal(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.animalService.getAnimal(id)
      .subscribe(animals => this.animal = animals);
  }

  goBack(): void {
    this.location.back();
  }

  dormir(): void {
    if (this.animal!.vivo==false){
      return this.messageService.add("O "+ this.animal?.name +" está morto");
    }
    if (this.animal!.energia == 100) {
        return this.messageService.add("O "+ this.animal?.name +" não precisa de dormir");
    }

    else if (this.animal!.energia > 50) {
        this.animal!.energia = 100;
    }

    else {
        this.animal!.energia += 50;
    }
    return this.messageService.add("O "+ this.animal?.name +" adormeceu e recuperou alguma energia");
}

  tentarComer(numero: string= document!.querySelectorAll('input')[1]!. value) {

    if (this.animal!.vivo==false){
      return this.messageService.add("O "+ this.animal?.name +" está morto");
    }

    var numerodetentativas = parseInt(numero)
    var sucesso: boolean = false;
    var percentagemSucesso: number = 0.20;
    var count:number = 0;
    console.log(numero)
    console.log(numerodetentativas)

    

    for (var i = 0; i < numerodetentativas; i++) {
        count += 1;
        
        if (count * 10 > this.animal!.energia) {
            this.animal!.vivo = false;
            this.animal!.energia = 0
            
            return this.messageService.add("O "+ this.animal?.name +" esgotou todas as suas energias e acabou por morrer");}
        else if (random.int(0, 100) < percentagemSucesso * 100) {
            var comido:string = this.animal!.alimentacao[random.int(0, this.animal!.alimentacao.length - 1)]
            this.animal!.energia -= count * 10
            return this.messageService.add("O "+ this.animal?.name +" comeu um " + comido + " após " + count + " tentativas. \nGastou " + count * 10 + " pontos de energia. \nSobreviveu mais um dia.")
        }
    }

    

    if ((numerodetentativas===0) || isNaN(numerodetentativas)){
      return this.messageService.add("Tem de alterar o número de tentativas");
    }


    this.animal!.energia -= count * 10
    return this.messageService.add("O "+ this.animal?.name +" não conseguiu encontrar nada para comer e acabou por perder " + count * 10 + " pontos de energia")

}

}
