import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OrderChildLog} from "../order-child-service";
declare var $;
@Component({
  selector: 'app-order-child-log',
  templateUrl: './order-child-log.component.html',
  styleUrls: ['./order-child-log.component.css']
})
export class OrderChildLogComponent implements OnInit, OnChanges {

  @Input()
  orderChildLogList: Array<OrderChildLog>;

  constructor() { }

  ngOnInit() {
    if (this.orderChildLogList) {
      $("#orderChildLogModal").modal();
    }else {
      $("#orderChildLogModal").modal('hide');
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.orderChildLogList) {
      $("#orderChildLogModal").modal();
    }else {
      $("#orderChildLogModal").modal('hide');
    }
  }
}
