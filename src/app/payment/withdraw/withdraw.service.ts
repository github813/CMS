import { Injectable } from '@angular/core';
import {Api} from "../../common/api";
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class WithdrawService {
  findParam:any;
  constructor(public ajax:Ajax) { }
  findList(param:{}):Observable<any>{
    this.findParam = param;
    return this.ajax.post(Api.withdrawList,param);
  }
  findById(id:string):Observable<any>{
    return this.ajax.getByParams(Api.withdrawFindById,{id});
  }
  settlementSync(serialNumber:string):Observable<any>{
    let p = new URLSearchParams();
    p.set("serialNumber",serialNumber);
    return this.ajax.post(Api.withdrawettlementSync, p);
  }
  settlementSendBack(id:number):Observable<any>{
    let p = new URLSearchParams();
    p.set("id",id.toString());
    return this.ajax.post(Api.withdrawettlementSendBack, p);
  }
  settlementQuery(serialNumber:string):Observable<any>{
    return this.ajax.getByParams(Api.withdrawettlementQuery, {serialNumber});
  }

}

export class Withdraw{
  constructor(public id:number,
              public userCode:number,
              public status:number,
              public tradeNo:string,
              public payNo:string,
              public figure:number,
              public transferTime:string,
              public createTime:string
  ){}
}

export class WithdrawView{
  constructor(public id:number,
              public userCode:number,
              public status:number,
              public tradeNo:string,
              public payNo:string,
              public figure:number,
              public transferTime:string,
              public remark:string,
              public createTime:string,
              public modifiedTime:string,
  ){}
}
export class SettlementQuery{
  constructor(public accountName:string,
              public accountNumber:string,
              public accountType:string,
              public amount:number,
              public status:number,
              public remark:string
  ){}
}

