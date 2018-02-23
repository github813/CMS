import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PaginationComponent} from "./pagination/pagination.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SimplePageComponent } from './simple-page/simple-page.component';
import { ImageCarouselComponent } from './image-carousel/image-carousel.component';
import { ConfirmPopupWindowComponent } from './confirm-popup-window/confirm-popup-window.component';
import { ResultPopupWindowComponent } from './result-popup-window/result-popup-window.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [PaginationComponent, SimplePageComponent, ImageCarouselComponent, ConfirmPopupWindowComponent, ResultPopupWindowComponent],
  exports:[PaginationComponent, SimplePageComponent, ImageCarouselComponent, ConfirmPopupWindowComponent, ResultPopupWindowComponent],
})
export class ComponentModule { }
