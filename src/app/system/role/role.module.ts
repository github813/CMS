import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoleComponent } from './role.component';
import {RoleRoutes} from "./role.routes";
import {RouterModule} from "@angular/router";
import {RoleService} from "./role.service";
import {ReactiveFormsModule} from "@angular/forms";
import {MenuOutModule} from "../menu/menuout.module";

@NgModule({
  declarations: [
    RoleComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(RoleRoutes),
    MenuOutModule,
  ],
  providers: [RoleService],
  bootstrap:[RoleComponent],
})
export class RoleModule { }
