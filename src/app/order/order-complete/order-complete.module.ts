import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Ajax} from "../../common/ajax";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../component/component.module";
import {RouterModule} from "@angular/router";
import {OrderCompleteRoutes} from "./order-complete.routes";
import {OrderCompleteComponent} from "./order-complete.component";
import {OrderCompletePipe} from "./order-complete.pipe";
import {OrderCompleteService} from "./order-complete.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentModule,
    RouterModule.forChild(OrderCompleteRoutes)
  ],
  declarations: [OrderCompleteComponent , OrderCompletePipe],
  providers: [OrderCompleteService, Ajax]
})
export class OrderCompleteModule { }
