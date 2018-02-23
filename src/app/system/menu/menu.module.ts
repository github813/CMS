import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {MenuRoutes} from "./menu.routes";
import {MenuService} from "./menu.service";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(MenuRoutes)
  ],
  declarations: [MenuComponent],
  providers:[MenuService]
})
export class MenuModule { }
