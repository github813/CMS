import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {HeaderComponent} from './home/header/header.component';
import {MenuComponent} from './home/menu/menu.component';
import {ContentComponent} from './home/content/content.component';
import {AppRoutingModule} from "./app-routing.module";
import {ReactiveFormsModule} from "@angular/forms";
import {Ajax} from "./common/ajax";
import {HttpModule} from "@angular/http";
import {AppService} from "./app.service";
import {LoginComponent} from './home/login/login.component';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";






@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    ContentComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [AppService, Ajax,{provide: LocationStrategy,useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
    //SessionStorage.setUser({userId:'1',accessToken:'1234567890',name:'许建科'});

  }
}
