import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {StackTraceElement} from "../log-service.service";
declare var $;
@Component({
  selector: 'app-stack-trace',
  templateUrl: './stack-trace.component.html',
  styleUrls: ['./stack-trace.component.css']
})
export class StackTraceComponent implements OnInit, OnChanges {

  @Input()
  stackTraceElements: Array<StackTraceElement>;

  constructor() {
  }

  ngOnInit() {
    if (this.stackTraceElements) {
      $("#stackTraceModal").modal();
    }else {
      $("#stackTraceModal").modal('hide');
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.stackTraceElements) {
      $("#stackTraceModal").modal();
    }else {
      $("#stackTraceModal").modal('hide');
    }
  }
}
