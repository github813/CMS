import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ComponentModule} from "../../component/component.module";
import {DictionariesRoutes} from "./dictionaries.routes";
import {DictionariesComponent} from "./dictionaries.component";
import {DictionariesService} from "./dictionaries.service";
import {DictionariesFormComponent} from "./dictionaries-form/dictionaries-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(DictionariesRoutes)
  ],
  declarations: [DictionariesComponent,DictionariesFormComponent],
  providers: [DictionariesService]
})
export class DictionariesModule { }
