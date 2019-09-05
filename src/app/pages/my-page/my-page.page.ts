import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-my-page',
  templateUrl: './my-page.page.html',
  styleUrls: ['./my-page.page.scss'],
})
export class MyPagePage implements OnInit {
  user = {
    id: 0,
    name: '',
    email: '',
    lastvu: '',
    avatar: ''
  };

  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private authService: AuthService,
  ) { }

  ngOnInit() {

    this.loader(2000).then(() => {
      this.storage.get('user').then((val) => {
        this.user = val;

      }).then(() => this.loadingController.dismiss());
    });

  }
  checkin() {
    console.log( this.user.id);
    this.authService.checkIn(this.user.id);
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

    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }

}
