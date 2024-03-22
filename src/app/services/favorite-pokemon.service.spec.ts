import { TestBed } from '@angular/core/testing';

import { FavoritePokemonService } from './favorite-pokemon.service';

describe('FavoritePokemonService', () => {
  let service: FavoritePokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
