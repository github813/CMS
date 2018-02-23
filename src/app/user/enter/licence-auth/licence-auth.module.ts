import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LicenceAuthComponent } from './licence-auth.component';
import { LicenceAuthFormComponent } from './licence-auth/licence-auth-form/licence-auth-form.component';
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentModule} from "../../../component/component.module";
import {HttpModule} from "@angular/http";
import {LicenceAuthRoutes} from "./licence-auth.routes";
import {LicenceAuthService} from "./licence-auth.service";
import {Ajax} from "../../../common/ajax";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(LicenceAuthRoutes)
  ],
  declarations: [LicenceAuthComponent, LicenceAuthFormComponent],
  providers: [Ajax,LicenceAuthService],
  bootstrap: [LicenceAuthComponent]
})
export class LicenceAuthModule { }
