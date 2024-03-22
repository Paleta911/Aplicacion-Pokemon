import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemons: any[] = [];
  private favoritePokemonsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) {}

  getPokemons(): Observable<any[]> {
    return this.http.get<any[]>('https://pokeapi.co/api/v2/pokemon?limit=20');
  }

  getFavoritePokemons(): Observable<any[]> {
    return this.favoritePokemonsSubject.asObservable();
  }

  addToFavorites(pokemon: any) {
    const favorites = this.favoritePokemonsSubject.getValue();
    this.favoritePokemonsSubject.next([...favorites, pokemon]);
  }
}




// import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';
// import { HttpClient } from '@angular/common/http';

// @Injectable({
//   providedIn: 'root'
// })
// export class PokemonService {
//   private dataPath = 'assets/pokemon.json';

//   constructor(private http: HttpClient) {}

//   getPokemons(): Observable<any> {
//     return this.http.get<any[]>(this.dataPath);
//   }
// }