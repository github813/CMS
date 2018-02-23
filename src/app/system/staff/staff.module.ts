import { NgModule } from '@angular/core';
import { StaffComponent } from './staff.component';
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {StaffRoutes} from "./staff.routes";
import {ComponentModule} from "../../component/component.module";
import {StaffService} from "./staff.service";
import { StaffFormComponent } from './staff-form/staff-form.component';
import {RoleOutModule} from "../role/roleout.module";
import {DepartmentOutModule} from "../department/departmentout.module";


@NgModule({
  declarations: [
    StaffComponent,
    StaffFormComponent
  ],
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(StaffRoutes),
    RoleOutModule,
    DepartmentOutModule
  ],
  providers:[StaffService],
  bootstrap: [StaffComponent]
})
export class StaffModule { }
