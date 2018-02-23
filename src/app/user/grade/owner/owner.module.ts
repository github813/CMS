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
import {OwnerGradeFormComponent} from "./owner-grade-form/owner-grade-form.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(OwnerRoutes)
  ],
  declarations: [OwnerComponent,OwnerGradeFormComponent],
  providers: [Ajax,OwnerService],
  bootstrap: [OwnerComponent]
})
export class OwnerModule { }
