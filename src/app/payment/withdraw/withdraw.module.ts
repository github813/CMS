import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithdrawComponent } from './withdraw.component';
import {ComponentModule} from "../../component/component.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TransformModule} from "../../pipe/transform/transform.module";
import {WithdrawRoutes} from "./withdraw.routes";
import {RouterModule} from "@angular/router";
import {WithdrawService} from "./withdraw.service";
import {DateBeautifyPipe} from "./date-beautify.pipe";
import { WithdrawViewComponent } from './withdraw-view/withdraw-view.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    TransformModule,
    RouterModule.forChild(WithdrawRoutes),
  ],
  declarations: [WithdrawComponent,DateBeautifyPipe, WithdrawViewComponent],
  providers: [WithdrawService],
  bootstrap: [WithdrawComponent]
})
export class WithdrawModule { }
