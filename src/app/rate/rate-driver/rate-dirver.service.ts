import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class RateDirverService {
  constructor(private ajax: Ajax) {
  }

  listRateDirver(rateDriverQC : RateDriverQC): Observable<any> {
    return this.ajax.getByParams(Api.LIST_DRIVER_STAR_RATE,rateDriverQC);
  }

  getRateDirverById(id: number): Observable<any> {
    let params = {"id":id};
    return this.ajax.getByParams(Api.getRateDirverById,params);
  }

  saveRateDirver(rateDirver: RateDriver): Observable<any> {
    return this.ajax.post(Api.saveRateDirver, rateDirver);
  }

  updateRateDirver(id: number,rate:string): Observable<any> {
    let p = new URLSearchParams();
    p.set("id",id.toString());
    p.set("rate",rate);
    return this.ajax.put(Api.updateRateDirver, p);
  }

}

export class RateDriver {
  public id: number;
  public userId: number;
  public star: number;
  public rate: string;
  public createTime: string;
  public modifiedTime: string;
}

export class RateDriverQC {
  constructor(pageNum,
              pageSize) {
  }
}
