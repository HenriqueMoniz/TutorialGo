import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Animal } from './animal';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const animals = [
      {
        id:1,
        name: 'Tigre',
        especie: 'Tigre de bengala',
        alimentacao: ["Veado", "Javali", "Vaca", "Cavalo", "Cabra"],
        energia: 100,
        vivo: true
      },
      {
        id:2,
        name: 'Elefante',
        especie: 'Elefante Cinzento',
        alimentacao: ["Erva", "Arbustos"],
        energia: 100,
        vivo: true
      },
      {
        id:3,
        name: 'Hipópótamo',
        especie: 'Hipópótamo Comum',
        alimentacao: ["Erva", "Arbusto","Nenufar"],
        energia: 100,
        vivo: true
      },
      {
        id:4,
        name: 'Bacalhau',
        especie: 'Gadus morhua',
        alimentacao: ["Sardinha", "Cavala", "Chicharro", "Carapau", "Camarão"],
        energia: 100,
        vivo: true
      },
    ];
    return {animals};
  }

  genId(animals: Animal[]): number {
    return animals.length > 0 ? Math.max(...animals.map(animal => animal.id)) + 1 : 11;
  }
}