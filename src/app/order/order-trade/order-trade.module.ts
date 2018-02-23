import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ComponentModule} from "../../component/component.module";
import {OrderTradeService} from "./order-trade.service";
import {OrderTradeComponent} from "./order-trade.component";
import {OrderTradeRoutes} from "./order-trade.routes";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(OrderTradeRoutes)
  ],
  declarations: [OrderTradeComponent],
  providers: [OrderTradeService]
})
export class OrderTradeModule { }
