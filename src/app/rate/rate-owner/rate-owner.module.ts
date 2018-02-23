import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ComponentModule} from "../../component/component.module";
import {RateOwnerRoutes} from "./rate-owner.routes";
import {RateOwnerComponent} from "./rate-owner.component";
import {RateOwnerService} from "./rate-owner.service";
import { OwnerFormComponent } from './owner-form/owner-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(RateOwnerRoutes)
  ],
  declarations: [RateOwnerComponent, OwnerFormComponent],
  providers: [RateOwnerService]
})
export class RateOwnerModule { }
