import { Injectable } from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../../common/api";

@Injectable()
export class OrderChildOwnerCancelRuleService {
  constructor(private ajax: Ajax) {
  }
  // 货主取消订单赔偿规则列表
  listOrderChildOwnerCancelRule(): Observable<any> {
    return this.ajax.get(Api.LIST_ORDER_CHILD_OWNER_CANCEL_RULE);
  }

  //删除货主取消订单赔偿规则
  deleteOrderChildCancelRule(id: number): Observable<any> {
    return this.ajax.deleteByParams(Api.DELETE_ORDER_CHILD_OWNER_CANCEL_RULE, {id: id});
  }
  //保存货主取消订单赔偿规则
  saveOrderChildOwnerCancelRule(orderChildOwnerCancelRule: OrderChildOwnerCancelRule): Observable<any> {
    return this.ajax.post(Api.CREATE_ORDER_CHILD_OWNER_CANCEL_RULE, orderChildOwnerCancelRule);
  }
  //修改货主取消订单赔偿规则
  updateOrderChildOwnerCancelRule(orderChildOwnerCancelRule: OrderChildOwnerCancelRule): Observable<any> {
    return this.ajax.put(Api.UPDATE_ORDER_CHILD_OWNER_CANCEL_RULE, orderChildOwnerCancelRule);
  }

}

export class OrderChildOwnerCancelRule {
  public id: number;
  public time: number;
  public compensationFee: number;
  public createTime: string;
  public modifiedTime: string;
}
