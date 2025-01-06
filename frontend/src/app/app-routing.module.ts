import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CocktailsComponent } from './sections/cocktails/cocktails.component';
import { AlcoolsComponent } from './sections/alcools/alcools.component';
import { SoftsComponent } from './sections/softs/softs.component';
import { DessertsComponent } from './sections/desserts/desserts.component';
import { HotDrinksComponent } from './sections/hot-drinks/hot-drinks.component';
import { WinesComponent } from './sections/wines/wines.component';
import { BeersComponent } from './sections/beers/beers.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'hotdrinks', component: HotDrinksComponent },
  { path: 'softs', component: SoftsComponent },
  { path: 'desserts', component: DessertsComponent },
  { path: 'wines', component: WinesComponent },
  { path: 'cocktails', component: CocktailsComponent },
  { path: 'beers', component: BeersComponent },
  { path: 'alcools', component: AlcoolsComponent },
  { path: '**', redirectTo: '/home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }