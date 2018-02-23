import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OwnerRoutes} from "./owner.routes";
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../../component/component.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {OwnerService} from "./owner.service";
import {Ajax} from "../../../common/ajax";
import {OwnerComponent} from "./owner.component";
import {OwnerDetailComponent} from "./owner-detail/owner-detail.component";
import {EvaluateDetailComponent} from "./evaluate-detail/evaluate-detail.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {OrderInfoService} from "../../../order/order-info/order-info.service";
import {AddressDetailComponent} from "./address-detail/address-detail.component";
import {BlackDetailComponent} from "./black-detail/black-detail.component";
import {AddressEditComponent} from "./address-detail/address-edit.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(OwnerRoutes)
  ],
  declarations: [OwnerComponent,OwnerDetailComponent,EvaluateDetailComponent,OrderDetailComponent,AddressDetailComponent,BlackDetailComponent,AddressEditComponent],
  providers: [Ajax,OwnerService,OrderInfoService],
  bootstrap: [OwnerComponent]
})
export class OwnerModule { }
