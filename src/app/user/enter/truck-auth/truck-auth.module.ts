import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TruckAuthComponent } from './truck-auth.component';
import {TruckAuthRoutes} from "./truck-auth.routes";
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../../component/component.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {Ajax} from "../../../common/ajax";
import {TruckAuthService} from "./truck-auth.service";
import {TruckAuthFormComponent} from "./truck-auth-form/truck-auth-form.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(TruckAuthRoutes)
  ],
  declarations: [TruckAuthComponent, TruckAuthFormComponent],
  providers: [Ajax,TruckAuthService],
  bootstrap: [TruckAuthComponent]
})
export class TruckAuthModule { }
