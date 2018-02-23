import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TransformPipe} from "./transform.pipe";

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [TransformPipe],
  exports:[TransformPipe]
})
export class TransformModule { }
