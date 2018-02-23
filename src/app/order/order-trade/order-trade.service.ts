import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class OrderTradeService {
  constructor(private ajax: Ajax) {
  }

  listOrderTrades(orderNo:string): Observable<any> {
    return this.ajax.getByParams(Api.listOrderTrade,{orderNo:orderNo});
  }

  updateOrderStatus(orderNo:string,payStatus:number){
    let p = new URLSearchParams();
    p.set("orderNo",orderNo);
    p.set("payStatus",payStatus.toString());
    return this.ajax.post(Api.updateOrderStatus,p)
  }

}

export class OrderPayment {
  public id: number;
  public orderNo: string;
  public paymentItem: string;
  public serialNo: string;
  public amount: number;
  public operation: number;
  public status: number;
  public reason: number;
  public createTime: string;
  public modifiedTime: string;
}

