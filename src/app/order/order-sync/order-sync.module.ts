import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Ajax} from "../../common/ajax";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../component/component.module";
import {RouterModule} from "@angular/router";
import {OrderSyncRoutes} from "./order-sync.routes";
import {OrderSyncComponent} from "./order-sync.component";
import {OrderSyncService} from "./order-sync.service";
import {OrderSyncPipe} from "./order-sync.pipe";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentModule,
    RouterModule.forChild(OrderSyncRoutes)
  ],
  declarations: [OrderSyncComponent , OrderSyncPipe],
  providers: [OrderSyncService, Ajax]
})
export class OrderSyncModule { }
