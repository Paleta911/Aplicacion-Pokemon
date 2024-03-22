import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritePokemonService {
  private favoritePokemonsSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  public favoritePokemons$: Observable<any[]> = this.favoritePokemonsSubject.asObservable();

  constructor() {}

  getFavoritePokemons(): any[] {
    return this.favoritePokemonsSubject.getValue();
  }

  addFavoritePokemon(pokemon: any): void {
    const currentFavorites = this.getFavoritePokemons();
    const updatedFavorites = [...currentFavorites, pokemon];
    this.favoritePokemonsSubject.next(updatedFavorites);
  }

  removeFavoritePokemon(pokemon: any): void {
    const currentFavorites = this.getFavoritePokemons();
    const updatedFavorites = currentFavorites.filter(p => p !== pokemon);
    this.favoritePokemonsSubject.next(updatedFavorites);
  }
}
