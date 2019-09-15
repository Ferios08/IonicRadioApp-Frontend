import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { RadioService } from 'src/app/services/radio.service';
import { Router } from '@angular/router';
import { FavRadiosService } from 'src/app/services/fav-radios.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-favourite',
  templateUrl: './favourite.page.html',
  styleUrls: ['./favourite.page.scss'],
})
export class FavouritePage implements OnInit {
  stations: any;
  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private radiosService: RadioService,
    public alertController: AlertController,
    private router: Router,
    private favouriteService: FavRadiosService,


  ) { }

  ngOnInit() {
    this.loader(1000).then(() => {
      this.favouriteService.getAllFav().then((res) => {
        this.stations = res;
        console.log(this.stations);
      });
    }).then(() => {
      this.loadingController.dismiss();
    });

  }

  getStationID(station) {
    this.storage.set('stationID', station.id);
  }
  async loader(secs) {
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      duration: secs,
      spinner: 'bubbles'
    });
    await loading.present();
  }
}

