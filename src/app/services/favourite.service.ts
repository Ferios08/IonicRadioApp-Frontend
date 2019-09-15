import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavouriteService {
  favourites: [];
  STORAGE_KEY = 'favourites';

  constructor(
    private storage: Storage
  ) {

  }
  addToFav(filmId) {
    return this.getAllFav().then((res) => {
      if (res) {
        res.push(filmId);
        return this.storage.set('favourites', res);
      } else {
        return this.storage.set('favourites', [filmId]);
      }
    });


  }
  getAllFav() {
    return this.storage.get('favourites');
  


  }

  isFavourite(filmId) {
    return this.getAllFav().then((res) => {
      return res && res.indexOf(filmId) !== -1;
    });
  }


  unfavourite(filmId) {
    return this.getAllFav().then((res) => {
      if (res && res.indexOf(filmId) !== -1) {

        res.splice(res.indexOf(filmId), 1);
        this.storage.set('favourites', res);
        return res;
      }
    });

  }

}
