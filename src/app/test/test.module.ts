import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TestComponent} from "./test.component";
import {TestFilterPipe} from "./test-filter.pipe";
import {OneComponent} from "./one/one.component";
import {TwoComponent} from "./two/two.component";
import {TestService} from "./test.service";
import {RouterModule} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {Ajax} from "../common/ajax";
import {TestFormComponent} from "./test-form/test-form.component";
import {TestRoutes} from "./test.routes";
import {ComponentModule} from "../component/component.module";

@NgModule({
  declarations: [
    TestComponent,
    TestFormComponent,
    TestFilterPipe,
    OneComponent,
    TwoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpModule,
    ComponentModule,
    RouterModule.forChild(TestRoutes)
  ],
  providers: [TestService, Ajax],
  bootstrap: [TestComponent]
})
export class TestModule { }
