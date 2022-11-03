import { Component, OnInit } from '@angular/core';
import { AnimalService } from '../animal.service';
import { Animal } from '../animal';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  animals: Animal[] = [];
  constructor(private animalService: AnimalService) { }

  ngOnInit(): void {
  }

  getAnimals(): void {
    this.animalService.getAnimals()
      .subscribe(animals => this.animals = animals);
  }

}
