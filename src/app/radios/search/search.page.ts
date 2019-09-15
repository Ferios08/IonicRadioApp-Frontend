import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { RadioService } from 'src/app/services/radio.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {
  countries: any;
  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private radiosService: RadioService,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {

    this.radiosService.getCountries().subscribe(res => {
      this.countries = res;
    });

  }
  getCountryName(country) {
    this.storage.set('country', country.name);


  }

}
