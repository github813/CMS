import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {AppComponent} from "../../app.component";
import {RedisComponent} from "./redis.component";
import {RedisRoutes} from "./redis.routes";
import {RouterModule} from "@angular/router";
import {RedisService} from "./redis.service";

@NgModule({
  declarations: [
    RedisComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(RedisRoutes)
  ],
  providers: [AppComponent,RedisService],
  exports:[]
})
export class RedisModule { }
