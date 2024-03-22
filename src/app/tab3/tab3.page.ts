import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FavoritePokemonService } from '../services/favorite-pokemon.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  pokemons: any[] = [];
  filteredPokemons: any[] = [];

  constructor(private http: HttpClient, private favoritePokemonService: FavoritePokemonService) {
    this.getPokemons();
  }

  getPokemons() {
    this.http.get('https://pokeapi.co/api/v2/pokemon?limit=10000').subscribe((response: any) => {
      this.pokemons = response.results.map((pokemon: any) => {
        return {
          name: pokemon.name,
          url: pokemon.url,
          showDetails: false,
          height: 0,
          weight: 0,
          abilities: [],
          types: [],
          image: '',
          isFavorite: false
        };
      });
      this.filteredPokemons = [...this.pokemons]; // Inicialmente, muestra todos los Pokémon
    });
  }

  toggleDetails(url: string) {
    const pokemon = this.pokemons.find(p => p.url === url);
    if (pokemon) {
      if (!pokemon.showDetails) {
        this.http.get(url).subscribe((response: any) => {
          pokemon.height = response.height;
          pokemon.weight = response.weight;
          pokemon.abilities = response.abilities.map((ability: any) => ability.ability.name);
          pokemon.types = response.types.map((type: any) => type.type.name);
          pokemon.image = response.sprites.front_default;
          pokemon.showDetails = true;
        });
      } else {
        pokemon.showDetails = false;
      }
    }
  }

  toggleFavorite(pokemon: any) {
    pokemon.isFavorite = !pokemon.isFavorite; // Cambiamos el estado de isFavorite
    if (pokemon.isFavorite) {
      this.favoritePokemonService.addFavoritePokemon(pokemon); // Agregamos a la lista de favoritos utilizando el servicio
    } else {
      this.favoritePokemonService.removeFavoritePokemon(pokemon); // Quitamos de la lista de favoritos utilizando el servicio
    }
  }

  searchPokemon(event: any) {
    const keyword: string = event?.target?.value || ''; // Si event.target.value es null o undefined, asigna una cadena vacía
    if (!keyword.trim()) {
      this.filteredPokemons = [...this.pokemons]; // Si no hay keyword, mostrar todos los Pokémon
      return;
    }
  
    this.filteredPokemons = this.pokemons.filter(pokemon =>
      pokemon.name.toLowerCase().includes(keyword.toLowerCase())
    );
  }
  
  
}
