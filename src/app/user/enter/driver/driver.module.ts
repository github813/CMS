import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DriverComponent} from './driver.component';
import {ComponentModule} from "../../../component/component.module";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {DriverRoutes} from "./driver.routes";
import {FormComponent} from "./form/form.component";
import {Ajax} from "../../../common/ajax";
import {DriverService} from "./driver.service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(DriverRoutes)
  ],
  declarations: [DriverComponent, FormComponent],
  providers: [Ajax, DriverService],
  bootstrap: [DriverComponent]
})
export class DriverModule {
}
