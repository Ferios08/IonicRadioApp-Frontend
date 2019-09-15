import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor( private storage: Storage) { }

  addToStorage( key: string, obj ) {
    return this.storage.set(key, obj);
  }
  getFronStorage( key: string ) {
    return this.storage.get(key);
  }
}
