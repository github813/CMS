import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RechargeComponent } from './recharge.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RechargeService} from "./recharge.service";
import {ComponentModule} from "../../component/component.module";
import {RechargeRoutes} from "./recharge.routes";
import {RouterModule} from "@angular/router";
import { RechargeFormComponent } from './recharge-form/recharge-form.component';
import {TransformModule} from "../../pipe/transform/transform.module";
import { RechargeViewComponent } from './recharge-view/recharge-view.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(RechargeRoutes),
    TransformModule
  ],
  declarations: [RechargeComponent, RechargeFormComponent, RechargeViewComponent],
  providers: [RechargeService],
  bootstrap: [RechargeComponent]
})
export class RechargeModule { }
