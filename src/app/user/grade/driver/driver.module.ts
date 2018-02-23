import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DriverComponent} from './driver.component';
import {ComponentModule} from "../../../component/component.module";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {DriverService} from "./driver.service";
import {Ajax} from "../../../common/ajax";
import {DriverRoutes} from "./driver.routes";
import {DriverGradeFormComponent} from "./driver-grade-form/driver-grade-form.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(DriverRoutes)
  ],
  declarations: [DriverComponent,DriverGradeFormComponent],
  providers: [Ajax, DriverService],
  bootstrap: [DriverComponent]
})
export class DriverModule {
}
