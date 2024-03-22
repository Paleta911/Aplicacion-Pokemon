import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokeapiService {

  private readonly BASE_URL = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  getPokemonDetails(pokemonName: string) {
    return this.http.get(`${this.BASE_URL}/pokemon/${pokemonName}`);
  }

  getPokemonSpecies(pokemonName: string) {
    return this.http.get(`${this.BASE_URL}/pokemon-species/${pokemonName}`);
  }

  // Otros métodos para obtener información de la PokeAPI según sea necesario
}
