import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ComponentModule} from "../../component/component.module";
import {RateDriverRoutes} from "./rate-driver.routes";
import {RateDriverComponent} from "./rate-driver.component";
import {RateDirverService} from "./rate-dirver.service";
import { DriverFormComponent } from './driver-form/driver-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(RateDriverRoutes)
  ],
  declarations: [RateDriverComponent, DriverFormComponent],
  providers: [RateDirverService]
})
export class RateDriverModule { }
