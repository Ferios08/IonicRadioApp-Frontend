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
  user = {
    id: 0,
    name: '',
    email: '',
    lastvu: '',
    avatar: ''
  };
  pagename = '';
  now = new Date();


  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
  ) {
    this.sideMenu();
  }

  ngOnInit() {
    this.now = new Date();

    this.loader(1000).then(() => {
      this.storage.get('user').then((val) => {
        this.user = val;
        this.pagename = 'Hello ' + this.user.name;
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
  logout() {
    this.authService.logout();
    this.loader(500);
    this.router.navigate(['/login']);
  }

  sideMenu() {
    this.navigate =
      [
        {
          title: 'Movies',
          url: '/home/profile',
          icon: 'film'
        },
        {
          title: 'Radios',
          url: '/home/data',
          icon: 'radio'
        },
        {
          title: 'Setting',
          url: '/home/setting',
          icon: 'settings'
        },

      ];
  }
  changename(newname) {
    this.pagename = newname;

  }

}
