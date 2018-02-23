import {Injectable} from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../../common/api";
import {TruckDriverDTO} from "../../enter/driver/driver.service";
import {URLSearchParams} from '@angular/http';
@Injectable()
export class TruckService {

  constructor(public ajax: Ajax) {
  }

  findList(page: number): Observable<any> {
    return this.ajax.getByParams(Api.truckInfoList, {page: page})
  }

  findByTruckId(truckId: number): Observable<any> {
    return this.ajax.getByParams(Api.getTruckById, {truckId: truckId})
  }

  listTruckInfo(truckInfoQC: TruckInfoQC): Observable<any> {
    return this.ajax.getByParams(Api.listTruckInfo, truckInfoQC);
  }

  exportTruckToExcel(): Observable<any> {
    return this.ajax.getBlob(Api.EXPORT_TRUCK, null);
  }
//添加司机验证手机号
  public checkMobile1(mobile): Observable<any> {
    return this.ajax.get(Api.checkMobile1 + '?mobile=' + mobile);
  }
//  添加司机
  public truckAddDriver(params): Observable<any> {
    return this.ajax.post(Api.truckAddDriver ,params);
  }
//删除司机
  truckDelDriver(truckId: number,driverId:number): Observable<any> {
    return this.ajax.deleteByParams(Api.truckDelDriver, {truckId: truckId,driverId:driverId})
  }
  //修改车辆载重
  updateTruckLoad(truckId: string,truckLoad:string): Observable<any> {
    let p = new URLSearchParams();
    p.set("truckId",truckId.toString());
    p.set("truckLoad",truckLoad.toString());
    return this.ajax.post(Api.updateTruckLoad, p)
  }
}

export class TruckInfo {
  constructor(public id: number,
              public owner: string,
              public truckNo: string,
              public brand: string,
              public model: string,
              public load: number,
              public status: number,
              public truckStatus: number,
              public truckDriverDTOList: TruckDriverDTO[]) {
  }
}

export class TruckInfoQC {
  constructor(owner: string,//车主姓名
              mobile: string,//电话号
              status: number,//启用状态
              truckStatus: number,//审核状态
              truckNo: string,//车牌号
              model: string//车型
  ) {

  }
}
