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
  user: any;
  username: '';

  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.storage.get('name').then((val) => {
      this.username = val;
    });
    this.loader(2000).then(() => {
    this.storage.get('user').then((val) => {
      this.user = val;
      console.log(this.user);
    }).then(() => this.loadingController.dismiss()); });

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
logout(){
  this.authService.logout();
  this.loader(1000);
  this.router.navigate(['/login']);
}

}
