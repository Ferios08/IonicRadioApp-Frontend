import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { RadioService } from 'src/app/services/radio.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { FavRadiosService } from 'src/app/services/fav-radios.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  station: any = {
    name : '',
    id: '',
    country: '',
    homepage: '',
    favicon: '',

  };
  isFav = false;
  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private radiosService: RadioService,
    public alertController: AlertController,
    private router: Router,
    private favouriteService: FavRadiosService,

  ) {

  }

  ngOnInit() {
    this.loader(2000).then(() => {
      this.storage.get('stationID').then((id) => {
        this.radiosService.getStationById(id).subscribe((res) => {
          this.station = res[0];
          this.favouriteService.isFavourite(this.station).then((fav) => {
            this.isFav = fav;
          });
        });

      }).then(() => this.loadingController.dismiss());
    });



  }
  async loader(secs) {
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      duration: secs,
      spinner: 'bubbles'
    });
    await loading.present();
  }

  favourite() {
    this.favouriteService.addToFav(this.station).then((res) => {
      console.log("add " + this.station)
      this.isFav = true;
      this.ngOnInit();
    });
  }
  unfavourite() {
    this.favouriteService.unfavourite(this.station).then(() => {
      this.isFav = true;
      this.ngOnInit();
    });
  }

}
