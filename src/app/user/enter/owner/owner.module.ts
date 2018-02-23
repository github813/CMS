import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../../component/component.module";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {OwnerRoutes} from "./owner.routes";
import {OwnerComponent} from "./owner.component";
import {Ajax} from "../../../common/ajax";
import {OwnerService} from "./owner.service";
import {FormComponent} from "./form/form.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(OwnerRoutes)
  ],
  declarations: [OwnerComponent,FormComponent],
  providers: [Ajax,OwnerService],
  bootstrap: [OwnerComponent]
})
export class OwnerModule { }
