import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { SettingPage } from '../pages/setting/setting.page';
import { AllDataPage } from '../pages/all-data/all-data.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomePage,
        children: [
          {
            path: 'data',
            component: AllDataPage
          },
          {

            path: 'setting',
            component: SettingPage
          }

        ]
      }
    ])
  ],
  declarations: [
    HomePage,
    SettingPage,
    AllDataPage
    ]
})
export class HomePageModule { }
