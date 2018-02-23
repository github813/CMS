import { Injectable } from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Api} from "../../../common/api";
import {Observable} from "rxjs/Observable";
import {SessionStorage} from "../../../common/session_storage";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class VipownerService {
  public findParam;


  constructor(public ajax:Ajax) { }

  VipList(p):Observable<any>{

    return this.ajax.post(Api.VipList,p)
  }
  VipSave(data):Observable<any>{
    return this.ajax.post(Api.VipSave,data);
  }
  VipUpdate(data):Observable<any>{
    console.log(data);
    let params = new URLSearchParams();
    params.set("id",data.id);
    params.set("key",data.key);
    params.set("value",data.value);
    return this.ajax.post(Api.VipUpdate,params);
  }
}

export class Vipowner{
  constructor(
    public name:string,
    public mobile:string,
    public pwd:number,
  ){}
}

export class TruckDriverDTO{
  constructor(
    public userId:number,
    public truckId:number,
    public driverId:number,
    public name:string,
    public moblie:string,
    public driverImg:number
  ){}
}

export class DriverAuthQC{
  constructor(
    public name:string,
    public mobile:string,
    public cardNo:string,
    public status:number
  ){}
}
