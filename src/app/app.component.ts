import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { AuthService } from './auth/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  isLoggedIn: Observable<boolean>;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router,
    private storage: Storage,
    private authService: AuthService,
  ) {
    this.initializeApp();
    console.log("status" + this.storage.get('LOGGED_IN'));
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      console.log(this.storage.get('LOGGED_IN'));
    });


    this.storage.get('user').then((val) => {
      if (val)
{
      if ( val.expires_in > 60) 
      {
        this.router.navigate(['/home']);
        } else {
          this.router.navigate(['/login']);
        }
      }

    });
  }
}
