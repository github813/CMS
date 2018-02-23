import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import { InfoComponent } from './info.component';
import {InfoRoutes} from "./info.routes";
import {InfoService} from "./info.service";
import {RoleService} from "../../system/role/role.service";
import {DepartmentService} from "../../system/department/department.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(InfoRoutes)
  ],
  declarations: [InfoComponent],
  providers: [InfoService,RoleService,DepartmentService]
})
export class InfoModule { }
