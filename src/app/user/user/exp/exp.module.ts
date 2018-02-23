import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {Ajax} from "../../../common/ajax";
import {ExpService} from "./exp.service";
import {DriverexpComponent} from "./driverexp/driverexp.component";
import {OwnerexpComponent} from "./ownerexp/ownerexp.component";
import {ExpRoutes} from "./exp.routes";
import {GradepipeComponent} from "./gradepipe.component";
import { SaveexplogComponent } from './driverexp/saveexplog/saveexplog.component';
import { ExploglistComponent } from './driverexp/exploglist/exploglist.component';
import {ComponentModule} from "../../../component/component.module";

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(ExpRoutes)
  ],
  declarations: [DriverexpComponent,OwnerexpComponent,GradepipeComponent, SaveexplogComponent, ExploglistComponent],
  providers: [Ajax,ExpService],
  bootstrap: [DriverexpComponent]
})
export class ExpModule { }
