import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {OwnerStarRoutes} from "./owner-star.routes";
import {HttpModule} from "@angular/http";
import {ComponentModule} from "../../../component/component.module";
import {ReactiveFormsModule} from "@angular/forms";
import {Ajax} from "../../../common/ajax";
import {OwnerStarService} from "./owner-star.service";
import {OwnerStarComponent} from "./owner-star.component";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(OwnerStarRoutes)
  ],
  declarations: [OwnerStarComponent],
  providers: [Ajax,OwnerStarService],
  bootstrap: [OwnerStarComponent]
})
export class OwnerStarModule{ }
