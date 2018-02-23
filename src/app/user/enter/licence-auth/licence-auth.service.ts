import { Injectable } from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../../common/api";
import {SessionStorage} from "../../../common/session_storage";

@Injectable()
export class LicenceAuthService {

  private licenceAuthInfo:LicenceAuthInfo;

  constructor(public ajax:Ajax) { }

  findList(page:number):Observable<any>{
    return this.ajax.getByParams(Api.driverLicenceInfoList,{page:page})
  }

  setLicenceAuthInfo(licenceAuthInfo:LicenceAuthInfo){
    this.licenceAuthInfo = licenceAuthInfo;
  }

  getLicenceAuthInfo():LicenceAuthInfo{
    return this.licenceAuthInfo;
  }

  //车辆审核
  public authUpdate(id:number,userId:number,statusResult:number,content:string):Observable<any>{
    let user = SessionStorage.getUser();
    let adminUserAuthDTO = {
      "userType": 4,
      "userId": userId,
      "authId": id,
      "createById": user.userId,
      "createBy": user.name,
      "result": statusResult,
      "content": content
    };
    let result = this.ajax.post(Api.authUpdate,adminUserAuthDTO);
    console.log(result);
    return result;
  }

  listLicenceAuth(licenceAuthQC: LicenceAuthQC): Observable<any> {
    return this.ajax.getByParams(Api.listLicenceAuth, licenceAuthQC);
  }

}

export class LicenceAuthInfo{
  constructor(
    public id:number,
    public userId:number,
    public name:string,
    public licenceTime:string,
    public licenceImg:string,
    public content:string,
    public status:number,
    public mobile:string,
    public domain:string,
    public createTime:string,
    public modifiedTime:string
  ){}
}

export class LicenceAuthQC{
  constructor(
    public name:string,
    public status:number
  ){}
}
