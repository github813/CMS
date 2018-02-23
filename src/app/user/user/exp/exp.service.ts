import {Injectable} from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Observable } from "rxjs/Observable";
import {Api} from "../../../common/api";
import {URLSearchParams} from "@angular/http";


@Injectable()
export class ExpService {
  findParam:any;
  constructor(public ajax: Ajax) { }
  driverInfoquery(params:any){
    if(params.pageNum==1){
      if(params.name||params.mobile||params.star ){
        this.findParam=params;
      }else{
        this.findParam=null;
      }
    }else{
      this.findParam=params;
    }
    return this.ajax.getByParams(Api.driverInfoquery, params);
  }
  OwnerInfoquery(params:any){
    if(params.pageNum==1){
      if(params.name||params.mobile||params.star ){
        this.findParam=params;
      }else{
        this.findParam=null;
      }
    }else{
      this.findParam=params;
    }
    return this.ajax.getByParams(Api.ownerInfoquery, params);
  }
  savedriverExpLog(params:any){
    return this.ajax.post(Api.savedriverExpLog, params);
  }
  saveownerExpLog(params:any){
    return this.ajax.post(Api.saveownerExpLog, params);
  }
  ownerExpLoglist(userid:number,pageNum:number,pageSize:number){
    return this.ajax.get(Api.ownerExpLoglist+"?ownerId="+userid+"&pageNum="+pageNum+"&pageSize="+pageSize);
  }
  driverExpLoglist(userid:number,pageNum:number,pageSize:number){
    return this.ajax.get(Api.driverExpLoglist+"?driverId="+userid+"&pageNum="+pageNum+"&pageSize="+pageSize);
  }
  //hasReturnFee=1&userId=1
  updateHasReturnFeeByUserId(userid:number,hasReturnFee:number){
    return this.ajax.put(Api.updateHasReturnFeeByUserId+"?userId="+userid+"&hasReturnFee="+hasReturnFee,null)
  }

}
export class DriverInfo {
  constructor(public userId: number,
              public name: string,
              public mobile: string,
              public star: number,
              public exp: number,
              public goodTimes: number,
              public badTimes: number,
              public orderCount: number,
              public hasReturnFee:number
               ) {
  }
}
export class Explog {
  constructor(
              public id: number,
              public ownerId: number,
              public expCode: string,
              public expName: string,
              public expValue: number,
              public remark: string,
              public createTime: string,
              public modifiedTime: string,
  ) {
  }
}
