import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './home/home.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CocktailsComponent } from './sections/cocktails/cocktails.component';
import { MatCardModule } from '@angular/material/card';
import { AlcoolsComponent } from './sections/alcools/alcools.component';
import { SoftsComponent } from './sections/softs/softs.component';
import { DessertsComponent } from './sections/desserts/desserts.component';
import { HotDrinksComponent } from './sections/hot-drinks/hot-drinks.component';
import { WinesComponent } from './sections/wines/wines.component';
import { BeersComponent } from './sections/beers/beers.component';
import { FooterComponent } from './footer/footer.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CocktailsComponent,
    AlcoolsComponent,
    SoftsComponent,
    DessertsComponent,
    HotDrinksComponent,
    WinesComponent,
    BeersComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatCardModule
  ],

  providers: [
    provideAnimationsAsync()
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }