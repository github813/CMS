import {Injectable} from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Api} from "../../../common/api";
import {Observable} from "rxjs/Observable";

@Injectable()
export class OrderInsuranceFeeRuleServiceService {

  constructor(private ajax: Ajax) {
  }

  listOrderInsuranceFeeRule(): Observable<any> {
    return this.ajax.get(Api.LIST_ORDER_INSURANCE_FEE_RULE);
  }

  saveOrderInsuranceFeeRule(orderInsuranceFeeRule: OrderInsuranceFeeRule): Observable<any> {
    return this.ajax.post(Api.SAVE_ORDER_INSURANCE_FEE_RULE, orderInsuranceFeeRule);
  }

  deleteOrderInsuranceFeeRule(id: number): Observable<any> {
    return this.ajax.deleteByParams(Api.DELETE_ORDER_INSURANCE_FEE_RULE, {id: id});
  }

  updateOrderInsuranceFeeRule(orderInsuranceFeeRule: OrderInsuranceFeeRule): Observable<any> {
    return this.ajax.put(Api.UPDATE_ORDER_INSURANCE_FEE_RULE, orderInsuranceFeeRule);
  }

}

export class OrderInsuranceFeeRule {
  public id: number;
  public goodsPrice: number;
  public insurancePercent: number;
  public createTime: string;
  public modifiedTime: string;
}
