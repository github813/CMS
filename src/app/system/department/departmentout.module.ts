import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {ReactiveFormsModule} from "@angular/forms";

import {AppComponent} from "../../app.component";
import {DepartmentService} from "./department.service";
import {DepartSelectComponent} from "./depart-select/depart-select.component";

@NgModule({
  declarations: [
    DepartSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [DepartmentService,AppComponent],
  exports:[DepartSelectComponent]
})
export class DepartmentOutModule { }
