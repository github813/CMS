import { Injectable } from '@angular/core';
import {Api} from "../../common/api";
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class CpcnFeeService {

  constructor(public ajax:Ajax) { }
  findRechargeList(param):Observable<any>{
    let p = new URLSearchParams();
    p.set("page", param.page);
    p.set("pageSize",param.pageSize);
    p.set("beginDate",param.beginDate);
    p.set("endDate",param.endDate);
    return this.ajax.post(Api.cpcnFeeRechargeList, p);
  }
  findBindingList(param):Observable<any>{
    let p = new URLSearchParams();
    p.set("page", param.page);
    p.set("pageSize",param.pageSize);
    p.set("beginDate",param.beginDate);
    p.set("endDate",param.endDate);
    return this.ajax.post(Api.cpcnFeeBidingList, p);
  }
  findSettlementList(param):Observable<any>{
    let p = new URLSearchParams();
    p.set("page", param.page);
    p.set("pageSize",param.pageSize);
    p.set("beginDate",param.beginDate);
    p.set("endDate",param.endDate);
    return this.ajax.post(Api.cpcnFeeSettlementList, p);
  }

}

export class CpcnRechargeFee{
  constructor(public id:number,
              public userCode:number,
              public payNo:string,
              public tradeType:number,
              public createTime:string,
              public figure:number,
              public accountType:number,
              public fee:number,
  ){}
}
export class CpcnBindingFee{
  constructor(public id:number,
              public userCode:number,
              public payNo:string,
              public name:string,
              public cardNo:string,
              public mobile:string,
              public fee:number,
              public createTime:string,
  ){}
}
export class CpcnSettlementFee{
  constructor(public id:number,
              public userCode:number,
              public payNo:string,
              public figure:number,
              public transferTime:string,
              public fee:number,
              public createTime:string,
  ){}
}
