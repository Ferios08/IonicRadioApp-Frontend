import { Component, OnInit, Input } from '@angular/core';
import { LoadingController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/auth/auth.service';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';

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
  userid = 0;
  movies = [{
    id: 0,
    user_id: this.userid,
    name: '',
    duration: '',
    year: 0
  }];

  constructor(
    private storage: Storage,
    public loadingController: LoadingController,
    private authService: AuthService,
    private moviesService: MoviesService,
    public alertController: AlertController,
    private router: Router,
  ) { }

  ngOnInit() {

    this.loader(2000).then(() => {
      this.storage.get('user').then((val) => {
        this.user = val;
        this.userid = val.id;
        this.getMyMovies(this.userid);
      }).then(() => this.loadingController.dismiss());
    });


  }
  checkin() {
    console.log(this.user.id);
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
    this.ngOnInit();

    setTimeout(() => {

      event.target.complete();
    }, 2000);
  }


  getMyMovies( id){
    this.moviesService.Moviesbyuser(this.userid).subscribe(res => {
      if (res) {
        this.movies = res;
      }
    }, err => {
      this.alert('Alert', err.error.error);
    }
    );
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
    this.storage.set('movieid', movie.id).then(()=>{
      this.router.navigateByUrl(`/movie/${movie.id}`)
    })

  }
}
