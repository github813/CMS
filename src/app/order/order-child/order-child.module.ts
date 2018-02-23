import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../component/component.module";
import {OrderChildListComponent} from "./order-child-list/order-child-list.component";
import {RouterModule} from "@angular/router";
import {OrderChildRoutes} from "./order-child.routes";
import {OrderChildService} from "./order-child-service";
import {Ajax} from "../../common/ajax";
import {OrderChildDetailComponent} from "./order-child-detail/order-child-detail.component";
import {OrderInfoService} from "../order-info/order-info.service";
import {DriverService} from "../../user/user/driver/driver.service";
import { OrderChildStatusPipe } from './order-child-status.pipe';
import {DriverStatusPipe} from "./driver-status.pipe";
import {OrderTraceComponent} from "./order-trace/order-trace.component";
import { OrderChildStatisticsComponent } from './order-child-statistics/order-child-statistics.component';
import { OrderChildLogComponent } from './order-child-log/order-child-log.component';
import { OrderChildLogTypePipe } from './order-child-log-type.pipe';
import { OrderChildCompensationComponent } from './order-child-detail/order-child-compensation/order-child-compensation.component';
import {OrderChildCompensationServiceService} from "./order-child-compensation-service.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentModule,
    RouterModule.forChild(OrderChildRoutes),
  ],
  declarations: [OrderChildListComponent, OrderChildDetailComponent, OrderChildStatusPipe, DriverStatusPipe, OrderTraceComponent, OrderChildStatisticsComponent, OrderChildLogComponent, OrderChildLogTypePipe, OrderChildCompensationComponent],
  providers: [OrderChildService, Ajax, OrderInfoService, DriverService, OrderChildCompensationServiceService],
  bootstrap: [OrderChildListComponent]
})
export class OrderChildModule { }
