import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { RadioService } from 'src/app/services/radio.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-country',
  templateUrl: './country.page.html',
  styleUrls: ['./country.page.scss'],
})
export class CountryPage implements OnInit {
  stations: any;
  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private radiosService: RadioService,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {
    this.loader(1000).then(() => {
      this.storage.get('country').then((cou) => {
        this.radiosService.getStationsof(cou).subscribe(res => {
          this.stations = res;

        });
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
