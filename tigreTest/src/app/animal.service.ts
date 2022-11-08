import { Injectable } from '@angular/core';
import { Animal } from './animal';
import { ANIMALS } from './animal-list';
import { Observable, of } from 'rxjs';
import { catchError, tap,map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {RouterModule} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient,) { }

  private animalsUrl = 'api/animals';

  getAnimals(): Observable<Animal[]> {
    const animals = of(ANIMALS);
    return this.http.get<Animal[]>(this.animalsUrl).pipe(
      catchError(this.handleError<Animal[]>('getAnimals', []))
    );
    return animals;
  }

  getAnimal(id:number): Observable<Animal> {
    const animals = ANIMALS.find(h => h.id === id)!;
    return of(animals);
  }

  deleteAnimal(id: number): Observable<Animal> {
    const url = `${this.animalsUrl}/${id}`;
  
    return this.http.delete<Animal>(url);
  }

  searchAnimals(term: string): Observable<Animal[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Animal[]>(`${this.animalsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
         console.log(`found animals matching "${term}"`) :
         console.log(`no animals matching "${term}"`)),
      catchError(this.handleError<Animal[]>('searchAnimals', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


}
