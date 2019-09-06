import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Movie } from 'src/app/models/movie';
import { Storage } from '@ionic/storage';
import { MoviesService } from 'src/app/services/movies.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.page.html',
  styleUrls: ['./add-movie.page.scss'],
})
export class AddMoviePage implements OnInit {
  moviesForm: FormGroup;
  movie: Movie = {
    user_id: 0,
    name: '',
    duration: '',
    year: 0
  };
  userid = 0;

  constructor(
    private formBuilder: FormBuilder,
    private storage: Storage,
    private moviesService: MoviesService,
    private router: Router,
    public alertController: AlertController,
  ) { }

  ngOnInit() {
    this.storage.get('user').then((val) => {
      this.userid = val.id;
    });

    this.initForm();
  }
  initForm() {
    this.moviesForm = this.formBuilder.group({
      name: ['', Validators.required],
      year: ['', Validators.required],
      duration: ['', Validators.required],
    });
  }
  onSubmitForm() {

    const formValue = this.moviesForm.value;
    this.movie = {
      user_id: this.userid,
      name: formValue.name,
      duration: formValue.duration + ' hours',
      year: formValue.year
    };
    this.moviesService.addMovie(this.movie).subscribe(res => {

      if (res) {
        this.router.navigate(['/home/profile']);
        this.alert('Movie Added', '');
      }
    }, err => {
      this.alert('Error', err.error.error);
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
}
