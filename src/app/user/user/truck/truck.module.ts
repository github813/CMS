import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../../component/component.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {TruckRoutes} from "./truck.routes";
import {TruckComponent} from "./truck.component";
import {Ajax} from "../../../common/ajax";
import {TruckService} from "./truck.service";
import {TruckDetailComponent} from "./truck-detail/truck-detail.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(TruckRoutes)
  ],
  declarations: [TruckComponent,TruckDetailComponent],
  providers: [Ajax,TruckService],
  bootstrap: [TruckComponent]
})
export class TruckModule { }
