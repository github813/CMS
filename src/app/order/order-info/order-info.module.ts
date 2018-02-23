import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OrderInfoListComponent} from "./order-info-list/order-info-list.component";
import {OrderInfoService} from "./order-info.service";
import {Ajax} from "../../common/ajax";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../component/component.module";
import {RouterModule} from "@angular/router";
import {OrderInfoRoutes} from "./order-info.routes";
import { OrderInfoDetailComponent } from './order-info-detail/order-info-detail.component';
import {OrderInfoPipe} from "./order-info.pipe";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentModule,
    RouterModule.forChild(OrderInfoRoutes)
  ],
  declarations: [OrderInfoListComponent, OrderInfoDetailComponent, OrderInfoPipe],
  providers: [OrderInfoService, Ajax],
  bootstrap: [OrderInfoListComponent]
})
export class OrderInfoModule { }
