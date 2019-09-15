import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Movie } from 'src/app/models/movie';
import { MoviesService } from 'src/app/services/movies.service';
import { AlertController } from '@ionic/angular';
import { FavouriteService } from 'src/app/services/favourite.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.page.html',
  styleUrls: ['./movie.page.scss'],
})
export class MoviePage implements OnInit {
  movieid = 0;
  movie = {
    id: 0,
    user_id: 0,
    name: '',
    duration: '',
    year: 0
  };
  isFav = false;
  constructor(
    private storage: Storage,
    private moviesService: MoviesService,
    private favouriteService: FavouriteService,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.storage.get('movieid').then((val) => {
      this.movieid = val;
      this.favouriteService.isFavourite(this.movieid).then((res) => {
        this.isFav = res;
      });


    }).then(() => {
      this.moviesService.Moviebyid(this.movieid).subscribe(res => {
        if (res) {
          this.movie = res;
        }
      }, err => {
        this.alert('Error', err.error.error);
      }
      );
    });


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
  favourite() {
    this.favouriteService.addToFav(this.movieid).then((res) => {
      this.isFav = true;
      this.ngOnInit();
    });
  }
  unfavourite() {
    this.favouriteService.unfavourite(this.movieid).then(() => {
      this.isFav = true;
      this.ngOnInit();
    });
  }
}
