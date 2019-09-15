import { TestBed } from '@angular/core/testing';

import { FavRadiosService } from './fav-radios.service';

describe('FavRadiosService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FavRadiosService = TestBed.get(FavRadiosService);
    expect(service).toBeTruthy();
  });
});
