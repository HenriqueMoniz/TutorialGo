import { Component, OnInit } from '@angular/core';
import { Animal } from '../animal';
import { AnimalService } from '../animal.service';


@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})


export class AnimalComponent implements OnInit {
  animals:Animal[]=[];

  
  constructor(private animalService: AnimalService) { }
  ngOnInit(): void {
    this.getAnimals();
  }
  

getAnimals(): void {
  this.animalService.getAnimals()
    .subscribe(animals => this.animals= animals);

}

delete(animal: Animal): void {
  this.animals = this.animals.filter(a => a !== animal);
  this.animalService.deleteAnimal(animal.id).subscribe();
}

}
