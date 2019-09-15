import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class FavRadiosService {
  favourites: [];


  constructor(
    private storage: Storage
  ) {

  }
  addToFav(station) {
    return this.getAllFav().then((res) => {
      if (res) {
        let cond = 0;
        res.forEach(st => {
          if (st.id === station.id) {
            cond += 1;
          }

        });
        if (cond === 0) {
          res.push(station);
        }
        return this.storage.set('favstations', res);
      } else {
        return this.storage.set('favstations', [station]);
      }
    });


  }
  getAllFav() {
    return this.storage.get('favstations');
  }

  isFavourite(station) {
    return this.getAllFav().then((res) => {
      if (res) {


        let cond = 0;
        res.forEach(st => {
          if (st.id === station.id) {
            cond += 1;
          }
        });
        console.log(cond);
        return (cond > 0);
      }
    });
  }

  unfavourite(station) {
    return this.getAllFav().then((res) => {
      let cond = 0;
      res.forEach(st => {
        if (st.id === station.id) {
          cond = res.indexOf(st);
        }
      });


      res.splice(res.indexOf(cond), 1);
      this.storage.set('favstations', res);
      return res;

    });

  }

}
