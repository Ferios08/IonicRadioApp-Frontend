import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { LoadingController } from '@ionic/angular';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  navigate: any;
  user: any;
  pagename: any;


  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
  ) {
    this.sideMenu();
  }

  ngOnInit() {
    this.storage.get('name').then((val) => {
      this.pagename = 'Hello ' + val;
    });
    this.loader(2000).then(() => {
      this.storage.get('user').then((val) => {
        this.user = val;
        console.log(this.user);
      }).then(() => this.loadingController.dismiss());
    });

    console.log(this.user);
  }

  async loader(secs) {
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      duration: secs,
      spinner: 'bubbles'
    });
    await loading.present();
  }
  logout() {
    this.authService.logout();
    this.loader(1000);
    this.router.navigate(['/login']);
  }

  sideMenu() {
    this.navigate =
      [
        {
          title: 'Home',
          url: '/home',
          icon: 'home'
        },
        {
          title: 'Data',
          url: 'data',
          icon: 'analytics'
        },
        {
          title: 'Setting',
          url: 'setting',
          icon: 'settings'
        },

      ];
  }
  changename(newname) {
    this.pagename = newname;

  }

}
