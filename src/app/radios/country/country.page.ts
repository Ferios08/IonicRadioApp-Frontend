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
    this.storage.get('country').then((cou) => {
      this.radiosService.getStationsof(cou).subscribe(res => {
        this.stations = res;

      });
    });

  }
  getStationID(station) {
    this.storage.set('stationID', station.id);


  }

}
