import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {Result} from "../../common/dto";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class SettlementService {

  withdrawApplication:WithdrawApplication;
  auditProcessNode={};
  settlementParam:{} = null;

  constructor(public ajax: Ajax) { }

  findAuditList(param: {}): Observable <any> {
    return this.ajax.getByParams(Api.withDrawApplicationListForAudit, param);
  }
  findById(form): Observable <any> {
    return this.ajax.getByParams(Api.withdrawFindById, form);
  }
  findList(form): Observable<any> {

    return this.ajax.post(Api.withDrawApplicationList, form);
  }
  save(form): Observable<any> {

    return this.ajax.post(Api.withDrawApplicationSave, form);
  }
  audit(form): Observable <any> {
    let p = new URLSearchParams();
    p.set("id",form.id);
    p.set("remark",form.remark);
    p.set("result",form.result);
    return this.ajax.put(Api.withDrawApplicationAudit, p);
  }
  findLogById(withdrawApplicationId: string): Observable <any> {
    return this.ajax.getByParams(Api.withdrawAuditLogList, {withdrawApplicationId});
  }
  findAuditProcessNodeList(processName: string ){
    //return this.ajax.getByParams(Api.wauditProcesslistNode, {processName});
    if(this.auditProcessNode[processName]){
      //如果有缓存伪造相应
      let ret = new Result(0, 'success', this.auditProcessNode[processName]);
      //创建Observable对象
      return Observable.from([ret]);
    }
    return this.ajax.getByParams(Api.wauditProcesslistNode, {processName}).filter(ret =>{
      if(ret.code == 0 ){
        //设置缓存
        this.auditProcessNode[processName] = ret.data;
      }
      return true;
    });
  }
  settlement(id: string){
    let p = new URLSearchParams();
    p.set("id",id);
    return this.ajax.post(Api.withDrawApplicationSettlement, p);
  }
  cancel(id: string){
    let p = new URLSearchParams();
    p.set("id",id);
    return this.ajax.put(Api.withDrawApplicationCancel, p);
  }


}
export class WithdrawApplication {
  constructor(
    public id: number,
    public createBy: number,
    public createByName: string,
    public amount: number,
    public cardNum: string,
    public cardOwnerName: string,
    public bankName: string,
    public remark: string,
    public status: string,
    public currentNodeNo: number,
    public currentRoleId: number,
    public createTime: string
  ) { }
}
export class AuditLog {
  constructor(
    public id: number,
    public auditByName: string,
    public auditResult: string,
    public nodeName: string,
    public nodeNo: number,
    public remark: string,
    public createTime: string
  ) {}
}

export class AuditProcessNode {
  constructor(
    public nodeNo: number,
    public nodeName: string,
    public nextNodeNo: number,
    public roleId: number,
    public nodeType: number
  ) {}
}
