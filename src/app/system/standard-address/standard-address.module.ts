import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { ComponentModule } from "../../component/component.module";
import { StandardAddressRoutes } from "./standard-address.routes";
import { StandardAddressComponent } from "./standard-address.component";
import { StandardAddressService } from "./standard-address.service";
import {AddsystemAddressComponent} from "./addsystem-address/addsystem-address.component";

@NgModule({
    imports: [
        CommonModule, FormsModule,
        ReactiveFormsModule,
        ComponentModule,
        RouterModule.forChild(StandardAddressRoutes)
    ],
    declarations: [StandardAddressComponent,AddsystemAddressComponent],
    providers: [StandardAddressService]
})
export class StandardAddressModule { }
