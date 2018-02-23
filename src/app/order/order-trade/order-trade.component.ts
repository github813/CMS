import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OrderPayment, OrderTradeService} from "./order-trade.service";

@Component({
  selector: 'app-order-trade',
  templateUrl: './order-trade.component.html',
  styleUrls: ['./order-trade.component.css']
})
export class OrderTradeComponent implements OnInit {

  public orderNo:string;

  public orderTradeList: Array<OrderPayment> = new Array;

  constructor(private routerInfo: ActivatedRoute,private orderTradeService:OrderTradeService) { }

  ngOnInit() {
    this.orderNo = this.routerInfo.snapshot.params['orderNo'];
    this.listOrderTrades();
  }

  listOrderTrades() {
    this.orderTradeService.listOrderTrades(this.orderNo).subscribe((result) => {
      if (result.code == 0) {
        this.orderTradeList = result.data;
      }else{
        alert(result.msg);
      }
    });
  }

  return(){
    this.orderTradeService.updateOrderStatus(this.orderNo,2).subscribe((result) => {
      if (result.code == 0) {
        alert("success");
      }else{
        alert(result.msg);
      }
    });
  }

  goOn(){
    this.orderTradeService.updateOrderStatus(this.orderNo,1).subscribe((result) => {
      if (result.code == 0) {
        alert("success");
      }else{
        alert(result.msg);
      }
    });
  }

}
