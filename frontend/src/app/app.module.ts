import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
<<<<<<< HEAD
import { AppRoutingModule } from './/app-routing.module';
=======
import { LandingComponent } from './landing/landing.component';
>>>>>>> 0c484fb2e32aace2715d423023b97dbcd1d223e9


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
