import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department.component';
import {RouterModule} from "@angular/router";
import {DepartmentRoutes} from "./department.routes";
import {ReactiveFormsModule} from "@angular/forms";
import {DepartmentService} from "./department.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(DepartmentRoutes)
  ],
  declarations: [DepartmentComponent],
  providers:[DepartmentService]
})
export class DepartmentModule { }
