import { Injectable } from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../../common/api";
import {OwnerAuthQC} from "../owner/owner.service";
import {SessionStorage} from "../../../common/session_storage";

@Injectable()
export class OwnerService {

  private ownerAuthInfo:OwnerAuthInfo;

  constructor(public ajax:Ajax) { }

  findList(page:number):Observable<any>{
    return this.ajax.getByParams(Api.ownerCompanyAuthInfoList,{page:page})
  }

  setOwnerAuthInfo(ownerAuthInfo:OwnerAuthInfo){
    this.ownerAuthInfo = ownerAuthInfo;
  }

  getOwnerAuthInfo():OwnerAuthInfo{
    return this.ownerAuthInfo;
  }

  //货主审核
  public authUpdate(id:number,userId:number,statusResult:number,content:string):Observable<any>{
    let user = SessionStorage.getUser();
    let adminUserAuthDTO = {
      "userType": 1,
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

  listOwnerAuth(ownerAuthQC: OwnerAuthQC): Observable<any> {
    return this.ajax.getByParams(Api.listOwnerAuth, ownerAuthQC);
  }

}

export class OwnerAuthInfo{
  constructor(
    public id:number,
    public userId:number,
    public name:string,
    public mobile:string,
    public type:number,
    public cardNo:string,
    public status:number,
    public title:string,
    public company:string,
    public groupCode:string,
    public address:string,
    public content:string,
    public createTime:string,
    public cardFrontImg:string,
    public cardBackImg:string,
    public faceCardImg:string,
    public businessImg:string,
    public domain:string
  ){}
}
