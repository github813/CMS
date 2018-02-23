import {Injectable} from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../../common/api";
import {TruckInfo} from "../../user/truck/truck.service";


@Injectable()
export class DriverStarService {

  constructor(public ajax: Ajax) {
  }

  findList(page: number): Observable<any> {
    return this.ajax.getByParams(Api.driverInfoList, {page: page})
  }

  findByDriverId(driverId: number): Observable<any> {
    return this.ajax.getByParams(Api.getDriverInfoByDriverId, {driverId: driverId})
  }
  deleteTruck(id: number): Observable<any> {
    return this.ajax.deleteByParams(Api.deleteTruck, {id: id})
  }
  /**
   * 获取评价信息
   * @param driverId
   * @returns {Observable<any>}
   */
  getDriverEvaluateByUserId(driverId: number): Observable<any> {
    return this.ajax.getByParams(Api.getDriverEvaluateByUserId, {userId: driverId})
  }

  listDriverInfo(driverInfoQC: DriverInfoQC): Observable<any> {
    return this.ajax.getByParams(Api.listDriverInfo, driverInfoQC);
  }

  exportDriverUserToExcel(): Observable<any> {
    return this.ajax.getBlob(Api.EXPORT_DRIVER_USER, null);
  }
  //  获取司机星级DriverStarById
  driverStarById(driverId: number): Observable<any> {
    return this.ajax.getByParams(Api.DriverStarById, {driverId:driverId});
  }
  //DriverStarUpdate
  driverStarUpdate(driverId: number,star:number): Observable<any> {
    return this.ajax.put(Api.DriverStarUpdate+"?star="+star+"&userId="+driverId, null);
  }
}

export class DriverInfo {
  constructor(public id: number,
              public name: string,
              public mobile: string,
              public status: number,
              public authed: number,
              public licenceAuth: number,
              public sex: number,
              public headImg: string,
              public domain: string,
              public licenseTime: string,
              public truckDTOList: TruckInfo[]) {
  }
}

export class EvaluateDTO {
  constructor(public userId: number,
              public orderNo: string,
              public mobile: string,
              public userName: string,
              public fromId: number,
              public headImg: string,
              public fromName: string,
              public type: number,
              public comment: string,
              public time: string,
              public evaluateLabelDTOList: EvaluateLabelDTO[]) {
  }
}

export class EvaluateLabelDTO {
  constructor(public labelId: number,
              public label: string) {
  }
}

export class DriverInfoQC {
  constructor(name: string,//姓名
              mobile: string,//电话号
              status: number,//启用状态
              authed: number,//审核状态
              pageNum,
              pageSize) {

  }
}
