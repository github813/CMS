import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {OrderChildDriverCancelRuleComponent} from './order-child-driver-cancel-rule/order-child-driver-cancel-rule.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ConfigRoutes} from "./config.routes";
import {OrderChildDriverCancelRuleService} from "./order-child-driver-cancel-rule/order-child-driver-cancel-rule.service";
import {ComponentModule} from "../../component/component.module";
import {OrderChildOwnerCancelRuleComponent} from './order-child-owner-cancel-rule/order-child-owner-cancel-rule.component';
import {OrderChildOwnerCancelRuleService} from "./order-child-owner-cancel-rule/order-child-owner-cancel-rule.service";
import {BannerService} from "./banner/banner.service";
import { BannerActionPipePipe } from './banner/banner-action-pipe.pipe';
import { OwnerBannerComponent } from './banner/owner-banner/owner-banner.component';
import {DriverBannerComponent} from "./banner/driver-banner/driver-banner.component";
import { OrderInsuranceFeeRuleComponent } from './order-insurance-fee-rule/order-insurance-fee-rule.component';
import {OrderInsuranceFeeRuleServiceService} from "./order-insurance-fee-rule/order-insurance-fee-rule-service.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(ConfigRoutes)
  ],
  declarations: [OrderChildDriverCancelRuleComponent, OrderChildOwnerCancelRuleComponent, OwnerBannerComponent, BannerActionPipePipe, DriverBannerComponent, OrderInsuranceFeeRuleComponent],
  providers: [OrderChildDriverCancelRuleService, OrderChildDriverCancelRuleComponent, OrderChildOwnerCancelRuleComponent, OrderChildOwnerCancelRuleService, BannerService, BannerActionPipePipe, OrderInsuranceFeeRuleServiceService]
})
export class ConfigModule {
}
