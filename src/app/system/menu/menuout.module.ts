import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {MenuService} from "./menu.service";
import {MenuSelectComponent} from "./menu-select/menu-select.component";
import {RoleService} from "../role/role.service";

@NgModule({
  declarations: [
    MenuSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [MenuService,RoleService],
  exports:[MenuSelectComponent]
})
export class MenuOutModule { }
