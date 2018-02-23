import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTableComponent } from './data-table.component';
import {RouterModule} from "@angular/router";
import {DataTableRoutes} from "./data-table.routes";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";

@NgModule({
  declarations: [DataTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forChild(DataTableRoutes)
  ],
  bootstrap: [DataTableComponent]
})
export class DataTableModule { }
