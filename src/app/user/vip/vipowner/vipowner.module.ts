import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ComponentModule} from "../../../component/component.module";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {VipownerRoutes} from "./vipowner.routes";
import {VipownerComponent} from "./vipowner.component";
import {Ajax} from "../../../common/ajax";
import {VipownerService} from "./vipowner.service";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(VipownerRoutes)
  ],
  declarations: [VipownerComponent],
  providers: [Ajax, VipownerService],
  bootstrap: [VipownerComponent]
})
export class VipownerModule {
}
