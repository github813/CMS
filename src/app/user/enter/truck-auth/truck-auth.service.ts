import { Injectable } from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../../common/api";
import {TruckInfoQC} from "../../user/truck/truck.service";
import {SessionStorage} from "../../../common/session_storage";

@Injectable()
export class TruckAuthService {

  private truckAuthInfo:TruckAuthInfo;

  constructor(public ajax:Ajax) { }

  findList(page:number):Observable<any>{
    return this.ajax.getByParams(Api.truckInfoList,{page:page})
  }

  setTruckAuthInfo(truckAuthInfo:TruckAuthInfo){
    this.truckAuthInfo = truckAuthInfo;
  }

  findByTruckId(truckId:number):Observable<any>{
    return this.ajax.getByParams(Api.getTruckDTOById,{truckId:truckId})
  }

  //车辆审核
  public authUpdate(id:number,userId:number,statusResult:number,content:string):Observable<any>{
    let user = SessionStorage.getUser();
    let adminUserAuthDTO = {
      "userType": 3,
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

  listTruckInfo(truckInfoQC: TruckInfoQC): Observable<any> {
    return this.ajax.getByParams(Api.listTruckInfo, truckInfoQC);
  }

  getTruckInfoListByTruckNo(truckNo:string,truckNo2:string): Observable<any> {
    let params = {"truckNo":truckNo,"truckNo2":"1"};
    return this.ajax.getByParams(Api.getTruckInfoListByTruckNo, params);
  }

}

export class TruckAuthInfo{
  constructor(
    public id:number,
    public userId:number,
    public owner:string,
    public mobile:string,
    public userName:string,
    public truckNo:string,
    public truckNo2:string,
    public brand:string,
    public model:string,
    public domain:string,
    public licenceImgMain:string,
    public licenceImgSecond:string,
    public licenceImgMain2:string,
    public licenceImgSecond2:string,
    public load:number,
    public status:number,
    public truckStatus:number,
    public content:string,
    public createTime:string,
    public modifiedTime:string
  ){}
}
