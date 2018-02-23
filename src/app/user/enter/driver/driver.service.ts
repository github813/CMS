import { Injectable } from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Api} from "../../../common/api";
import {Observable} from "rxjs/Observable";
import {SessionStorage} from "../../../common/session_storage";

@Injectable()
export class DriverService {

  private driverAuthInfo:DriverAuthInfo;

  constructor(public ajax:Ajax) { }

  findList(page:number):Observable<any>{
    return this.ajax.getByParams(Api.driverAuthInfoList,{page:page})
  }

  setDriverAuthInfo(driverAuthInfo:DriverAuthInfo){
    this.driverAuthInfo = driverAuthInfo;
  }

  getDriverAuthInfo():DriverAuthInfo{
    return this.driverAuthInfo;
  }

  //司机审核
  public authUpdate(id:number,userId:number,statusResult:number,content:string,type:string):Observable<any>{
    let user = SessionStorage.getUser();
    let adminUserAuthDTO = {
      "userType": 2,
      "userId": userId,
      "authId": id,
      "createById": user.userId,
      "createBy": user.name,
      "result": statusResult,
      "content": content,
      "type": type
    };
    let result = this.ajax.post(Api.authUpdate,adminUserAuthDTO);
    // console.log(result);
    return result;
  }

  listDriverAuth(driverAuthQC: DriverAuthQC): Observable<any> {
    return this.ajax.getByParams(Api.listDriverAuth, driverAuthQC);
  }

}

export class DriverAuthInfo{
  constructor(
    public id:number,
    public userId:number,
    public name:string,
    public mobile:string,
    public cardNo:string,
    public status:number,
    public content:string,
    public createTime:string,
    public cardFrontImg:string,
    public cardBackImg:string,
    public faceCardImg:string,
    public domain:string
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
