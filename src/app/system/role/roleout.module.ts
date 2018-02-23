import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RoleService} from "./role.service";
import {ReactiveFormsModule} from "@angular/forms";
import { RoleSelectComponent } from './role-select/role-select.component';
import {AppComponent} from "../../app.component";

@NgModule({
  declarations: [
    RoleSelectComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  providers: [RoleService,AppComponent],
  exports:[RoleSelectComponent]
})
export class RoleOutModule { }
