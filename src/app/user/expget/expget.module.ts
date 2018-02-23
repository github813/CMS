import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { Ajax } from "../../common/ajax";
import { DriverExpGetComponent } from './driver-exp-get/driver-exp-get.component';
import { ExpGetRoutes } from './expget.routes';
import { ExpGetService } from './expget.service';
import { OwnerExpGetComponent } from './owner-exp-get/owner-exp-get.component';
import { ExpAddComponent } from './exp-add/exp-add.component';


@NgModule({
    imports: [
        CommonModule,
        HttpModule,
        ReactiveFormsModule,
        RouterModule.forChild(ExpGetRoutes)
    ],
    declarations: [DriverExpGetComponent,OwnerExpGetComponent, ExpAddComponent],
    providers: [Ajax, ExpGetService],
    bootstrap: []
})
export class ExpGetModule {
}
