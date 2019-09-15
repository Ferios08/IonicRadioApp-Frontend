import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RadioService {

  constructor(private httpClient: HttpClient) { }
  SERVER_ADDRESS = 'http://www.radio-browser.info/webservice/json';


  getStationsofTunisia(): Observable<any> {
     return this.httpClient.get(`${this.SERVER_ADDRESS}/stations/bycountry/tunisia`);
  }

  getStationsof(country): Observable<any> {
    return this.httpClient.get(`${this.SERVER_ADDRESS}/stations/bycountry/${country}`);
 }

  getCountries(): Observable<any> {
    return this.httpClient.get(`${this.SERVER_ADDRESS}/countries`);
  }

  getStationById(id): Observable<any> {
    return this.httpClient.get(`${this.SERVER_ADDRESS}/stations/byid/${id}`);
  }
}


