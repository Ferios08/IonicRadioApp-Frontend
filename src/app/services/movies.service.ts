import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { MovieResponse } from '../models/movieResponse';
import { Movie } from '../models/movie';




@Injectable({
  providedIn: 'root'
})
export class MoviesService {
   AUTH_SERVER_ADDRESS = 'http://firas-chbiki.com:1338';
  // AUTH_SERVER_ADDRESS = 'http://localhost:1338';
  token = '';
  headers = new HttpHeaders({
    Authorization: `Bearer ${this.token}`
  });
  options = {
    headers: this.headers
  };

  constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) {
    this.storage.get('ACCESS_TOKEN').then((val) => {
      this.token = val;
    }).then(() => {
      this.headers = new HttpHeaders({
        Authorization: `Bearer ${this.token}`
      });

    }).then(() => {
      this.options = {
        headers: this.headers
      };

    })
      ;
  }

  addMovie(movie: Movie): Observable<MovieResponse> {
    return this.httpClient.post<MovieResponse>(`${this.AUTH_SERVER_ADDRESS}/movies`, movie, this.options).pipe(
      tap(async (res: MovieResponse) => {
        if (res) {

        }
      })

    );
  }

  Moviesbyuser(id): Observable<MovieResponse[]> {

    return this.httpClient.get<MovieResponse[]>(`${this.AUTH_SERVER_ADDRESS}/movies/byuser/ ${id}`, this.options).pipe(
      tap(async (res) => {
        if (res) {

        }
      })

    );
  }


  Moviebyid(id): Observable<MovieResponse> {


    const headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`
    });

    return this.httpClient.get<MovieResponse>(`${this.AUTH_SERVER_ADDRESS}/movies/ ${id}`, this.options).pipe(
      tap(async (res) => {
        if (res) {

        }
      })

    );
  }

}
