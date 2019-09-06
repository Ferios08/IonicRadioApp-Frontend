import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { MyPagePage } from './my-page.page';
import { MoviePage } from 'src/app/starwars/movie/movie.page';

const routes: Routes = [
  {
    path: '',
    component: MyPagePage,
    children: [
      {
        path: 'movie/:id',
        component: MoviePage
      }
    ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [MyPagePage,MoviePage]
})
export class MyPagePageModule {}
