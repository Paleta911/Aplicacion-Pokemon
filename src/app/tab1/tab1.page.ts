import { Component, OnInit } from '@angular/core';
import { FavoritePokemonService } from '../services/favorite-pokemon.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {
  favoritePokemons: any[] = [];

  constructor(private favoritePokemonService: FavoritePokemonService) {}

  ngOnInit() {
    this.favoritePokemonService.favoritePokemons$.subscribe((data) => {
      this.favoritePokemons = data;
    });
  }

  toggleDetails(pokemon: any) {
    pokemon.showDetails = !pokemon.showDetails;
  }

  toggleFavorite(pokemon: any) {
    if (pokemon.isFavorite) {
      this.favoritePokemonService.removeFavoritePokemon(pokemon); // Quitamos el Pokémon favorito
    } else {
      this.favoritePokemonService.addFavoritePokemon(pokemon); // Agregamos el Pokémon favorito
    }
    pokemon.isFavorite = !pokemon.isFavorite; // Actualizamos el estado del Pokémon
  }
}
