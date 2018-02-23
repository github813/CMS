import {Injectable} from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../../common/api";
import {Http} from "@angular/http";

@Injectable()
export class OrderChildDriverCancelRuleService {


  constructor(private ajax: Ajax, private http: Http) {
  }
  //司机取消订单规则列表
  listOrderChildDriverCancelRule(): Observable<any> {
    return this.ajax.get(Api.LIST_ORDER_CHILD_DRIVER_CANCEL_RULE);
  }

  //删除司机取消订单规则
  deleteOrderChildCancelRule(id: number): Observable<any> {
    return this.ajax.deleteByParams(Api.DELETE_ORDER_CHILD_DRIVER_CANCEL_RULE, {id: id});
  }
  //保存司机取消订单规则
  saveOrderChildDriverCancelRule(orderChildDriverCancelRule: OrderChildDriverCancelRule): Observable<any> {
    return this.ajax.post(Api.CREATE_ORDER_CHILD_DRIVER_CANCEL_RULE, orderChildDriverCancelRule);
  }
  //修改司机取消订单规则
  updateOrderChildDriverCancelRule(orderChildDriverCancelRule: OrderChildDriverCancelRule): Observable<any> {
    return this.ajax.put(Api.UPDATE_ORDER_CHILD_DRIVER_CANCEL_RULE, orderChildDriverCancelRule);
  }

}

export class OrderChildDriverCancelRule {
  public id: number;
  public time: number;
  public compensationFee: number;
  public createTime: string;
  public modifiedTime: string;
}
