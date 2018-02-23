import { Injectable } from '@angular/core';
import {Api} from "../../common/api";
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class RechargeService {
  findParam:any;
  constructor(public ajax:Ajax) { }
  findList(param:{}):Observable<any>{
    this.findParam = param;
    return this.ajax.post(Api.rechargeList,param);
  }
  save(form):Observable<any>{
    let p = new URLSearchParams();
    p.set("userCode",form.userCode);
    p.set("figure",form.figure);
    p.set("payNo",form.payNo);
    p.set("remark",form.remark);
    return this.ajax.post(Api.rechargeSave,p);
  }
  findById(id:string):Observable<any>{
    return this.ajax.getByParams(Api.rechargeFindById,{id});
  }
  cpcnFasterPaySync(serialNumber:string):Observable<any>{
    let p = new URLSearchParams();
    p.set("serialNumber",serialNumber);
    return this.ajax.post(Api.rechargeFasterPaySync, p);
  }

}

export class Recharge{
  constructor(public id:number,
              public userCode:number,
              public tradeNo:string,
              public type:number,
              public status:number,
              public figure:number,
              public payTime:string,
              public refundStatus:number,
              public createTime:string,
              public tradeType:number,
  ){}
}
export class RechargeView{
  constructor(public id:number,
              public userCode:number,
              public tradeNo:string,
              public payNo:string,
              public type:number,
              public status:number,
              public figure:number,
              public payTime:string,
              public refundStatus:number,
              public refundTime:string,
              public createTime:string,
              public modifiedTime:string,
              public tradeType:number,
              public operator:number,
              public remark:string
  ){}
}
