import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'home', redirectTo: 'home/profile', pathMatch: 'full' },
  { path: 'register', loadChildren: './auth/register/register.module#RegisterPageModule' },
  { path: 'login', loadChildren: './auth/login/login.module#LoginPageModule' },
  { path: 'setting', loadChildren: './pages/setting/setting.module#SettingPageModule' },
  { path: 'all-data', loadChildren: './pages/all-data/all-data.module#AllDataPageModule' },
  { path: 'home', loadChildren: './pages/my-page/my-page.module#MyPagePageModule' },
  { path: 'add-movie', loadChildren: './starwars/add-movie/add-movie.module#AddMoviePageModule' },
  { path: 'movie/:id', loadChildren: './starwars/movie/movie.module#MoviePageModule' },
  { path: 'search', loadChildren: './radios/search/search.module#SearchPageModule' },
  { path: 'favourite', loadChildren: './radios/favourite/favourite.module#FavouritePageModule' },
  { path: 'country', loadChildren: './radios/country/country.module#CountryPageModule' },
  { path: 'details', loadChildren: './radios/details/details.module#DetailsPageModule' },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
