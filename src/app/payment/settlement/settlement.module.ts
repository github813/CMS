import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettlementComponent } from './settlement.component';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentModule} from "../../component/component.module";
import {RouterModule} from "@angular/router";
import {SettlementRoutes} from "./settlement.routes";
import {TransformModule} from "../../pipe/transform/transform.module";
import {SettlementService} from "./settlement.service";
import { SettlementFormComponent } from './settlement-form/settlement-form.component';
import { SettlementViewComponent } from './settlement-view/settlement-view.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    TransformModule,
    RouterModule.forChild(SettlementRoutes),
  ],
  declarations: [SettlementComponent, SettlementFormComponent, SettlementViewComponent],
  providers:[SettlementService]
})
export class SettlementModule { }
