import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {DriverComponent} from "./driver.component";
import {DriverRoutes} from "./driver.routes";
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../../component/component.module";
import {ReactiveFormsModule} from "@angular/forms";
import {Ajax} from "../../../common/ajax";
import {DriverService} from "./driver.service";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {EvaluateDetailComponent} from "./evaluate-detail/evaluate-detail.component";
import {OrderChildService} from "../../../order/order-child/order-child-service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(DriverRoutes)
  ],
  declarations: [DriverComponent,UserDetailComponent,OrderDetailComponent,EvaluateDetailComponent],
  providers: [Ajax,DriverService,OrderChildService],
  bootstrap: [DriverComponent]
})
export class DriverModule { }
