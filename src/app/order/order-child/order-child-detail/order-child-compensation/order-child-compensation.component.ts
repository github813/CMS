import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {OrderChildCompensation} from "../../order-child-compensation-service.service";
declare var $;
@Component({
  selector: 'app-order-child-compensation',
  templateUrl: './order-child-compensation.component.html',
  styleUrls: ['./order-child-compensation.component.css']
})
export class OrderChildCompensationComponent implements OnInit, OnChanges {

  @Input()
  orderChildCompensationList: Array<OrderChildCompensation>;

  constructor() { }

  ngOnInit() {
    if (this.orderChildCompensationList) {
      $("#orderChildCompensationModal").modal();
    }else {
      $("#orderChildCompensationModal").modal('hide');
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.orderChildCompensationList) {
      console.log(this.orderChildCompensationList);
      $("#orderChildCompensationModal").modal();
    }else {
      $("#orderChildCompensationModal").modal('hide');
    }
  }

}
