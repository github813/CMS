import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentModule} from "../../component/component.module";
import {RouterModule} from "@angular/router";
import {TransformModule} from "../../pipe/transform/transform.module";
import {CpcnFeeComponent} from "./cpcn-fee.component";
import {CpcnFeeRoutes} from "./cpcn-fee.routes";
import {CpcnFeeService} from "./cpcn-fee.service";
import { RechargeComponent } from './recharge/recharge.component';
import { BindingComponent } from './binding/binding.component';
import { SettlementComponent } from './settlement/settlement.component';
import {DateBeautifyPipe} from "./date-beautify.pipe";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(CpcnFeeRoutes),
    TransformModule
  ],
  declarations: [CpcnFeeComponent, RechargeComponent, BindingComponent, SettlementComponent, DateBeautifyPipe ],
  providers: [CpcnFeeService],
  bootstrap: [CpcnFeeComponent]
})
export class CpcnFeeModule { }
