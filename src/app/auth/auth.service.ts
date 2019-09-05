import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

import { Storage } from '@ionic/storage';
import { User } from './user';
import { AuthResponse } from './auth-response';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  AUTH_SERVER_ADDRESS = 'http://localhost:1338';
  authSubject = new BehaviorSubject(false);

  constructor(
    private httpClient: HttpClient,
    private storage: Storage
  ) { }

  register(user: User): Observable<AuthResponse> {
    return this.httpClient.post<AuthResponse>(`${this.AUTH_SERVER_ADDRESS}/users`, user).pipe(
      tap(async (res: AuthResponse) => {
        if (res) {
          this.login(user);
          // await this.storage.set('ACCESS_TOKEN', res.token);
          // await this.storage.set('EXPIRES_IN', res.expires_in);
          this.authSubject.next(true);
        }
      })

    );
  }


  login(user: User): Observable<AuthResponse> {
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/auth/users`, user).pipe(
      tap(async (res: AuthResponse) => {

        if (res) {
          await this.storage.set('ACCESS_TOKEN', res.token);
          await this.storage.set('EXPIRES_IN', res.expires_in);
          this.authSubject.next(true);
          this.checkIn(res.id);
        }
      })
    );

  }

  checkIn(id): Observable<AuthResponse> {


    const noww = new Date().getTime();
    const newtime = {
      lastvu: '2025-11-10'
    };
    console.log(noww);
    return this.httpClient.put(`${this.AUTH_SERVER_ADDRESS}/users/check/:id`, newtime).pipe(
      tap(async (res: AuthResponse) => {

        if (res) {

          console.log(res);
        }
      })
    );
  }

  async logout() {

    await this.storage.remove('ACCESS_TOKEN');
    await this.storage.remove('EXPIRES_IN');
    await this.storage.remove('user');

    this.authSubject.next(false);
  }

  isLoggedIn() {
    return this.authSubject.asObservable();
  }
}
