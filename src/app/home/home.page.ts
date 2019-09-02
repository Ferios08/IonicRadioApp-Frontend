import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  username = '';

  constructor(
    private storage: Storage,
  ) { }


  ngOnInit() {
    this.storage.get('name').then((val) => {
      this.username = val;
    });
  }
}
