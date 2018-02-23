import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {DriverStarComponent} from "./driver-star.component";
import {DriverStarRoutes} from "./driver-star.routes";
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../../component/component.module";
import {ReactiveFormsModule} from "@angular/forms";
import {Ajax} from "../../../common/ajax";
import {DriverStarService} from "./driver-star.service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(DriverStarRoutes)
  ],
  declarations: [DriverStarComponent],
  providers: [Ajax,DriverStarService],
  bootstrap: [DriverStarComponent]
})
export class DriverStarModule{ }
