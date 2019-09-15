import { Component, OnInit } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { RadioService } from 'src/app/services/radio.service';

@Component({
  selector: 'app-all-data',
  templateUrl: './all-data.page.html',
  styleUrls: ['./all-data.page.scss'],
})
export class AllDataPage implements OnInit {

  user = {
    id: 0,
    name: '',
    email: '',
    lastvu: '',
    avatar: ''
  };
  userid = 0;
  stations: any;
  countries: any;


  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private authService: AuthService,
    private moviesService: MoviesService,
    private radiosService: RadioService,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {

    this.loader(2000).then(() => {
      this.storage.get('user').then((val) => {
        this.user = val;
        this.userid = val.id;

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
  doRefresh(event) {
    this.ngOnInit();

    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }




  async alert(head, msg) {
    const alert = await this.alertController.create({
      header: head,
      message: msg,
      animated: true,
      buttons: ['OK']
    });

    await alert.present();
  }

  sendid(movie) {
    this.storage.set('movieid', movie.id).then(() => {
      this.router.navigateByUrl(`/movie/${movie.id}`)
    });
  }
  getTunisiaRadio(): any {
    return this.radiosService.getStationsofTunisia();
  }
}
