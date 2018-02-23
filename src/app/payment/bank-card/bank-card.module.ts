import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentModule} from "../../component/component.module";
import {TransformModule} from "../../pipe/transform/transform.module";
import {BankCardService} from "./bank-card.service";
import {BankCardComponent} from "./bank-card.component";
import {RouterModule} from "@angular/router";
import {BankCardRoutes} from "./bank-card.routes";
import { BankCardFormComponent } from './bank-card-form/bank-card-form.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    TransformModule,
    RouterModule.forChild(BankCardRoutes)
  ],
  declarations: [BankCardComponent, BankCardFormComponent],
  providers: [BankCardService],
})
export class BankCardModule { }
