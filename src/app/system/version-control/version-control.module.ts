import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {ComponentModule} from "../../component/component.module";
import {VersionControlComponent} from "./version-control.component";
import {VersionControlRoutes} from "./version-control.routes";
import {VersionControlService} from "./version-control.service";
import {VersionControlFormComponent} from "./version-control-form/version-control-form.component";

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(VersionControlRoutes)
  ],
  declarations: [VersionControlComponent,VersionControlFormComponent],
  providers: [VersionControlService]
})
export class VersionControlModule { }
