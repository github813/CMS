import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LogComponentComponent} from './log-compoent/log-component.component';
import {ComponentModule} from "../component/component.module";
import {LogServiceService} from "./log-service.service";
import {RouterModule} from "@angular/router";
import {LogRoutes} from "./log.routes";
import {ReactiveFormsModule} from "@angular/forms";
import { StackTraceComponent } from './stack-trace/stack-trace.component';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule,
    ReactiveFormsModule,
    RouterModule.forChild(LogRoutes)
  ],
  declarations: [LogComponentComponent, StackTraceComponent],
  providers: [LogServiceService]
})
export class LogModule {
}
