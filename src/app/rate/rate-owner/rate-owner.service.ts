import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class RateOwnerService {
  constructor(private ajax: Ajax) {
  }

  listRateOwner(rateOwnerQC: RateOwnerQC): Observable<any> {
    return this.ajax.getByParams(Api.LIST_OWNER_STAR_RATE, rateOwnerQC);
  }
  getRateOwnerById(id: number): Observable<any> {
    let params = {"id":id};
    return this.ajax.getByParams(Api.getRateOwnerById,params);
  }

  saveRateOwner(rateOwner: RateOwner): Observable<any> {
    return this.ajax.post(Api.saveRateOwner, rateOwner);
  }

  updateRateOwner(id: number,rate:string): Observable<any> {
    let p = new URLSearchParams();
    p.set("id",id.toString());
    p.set("rate",rate);
    return this.ajax.put(Api.updateRateOwner, p);
  }
}
  export class RateOwner {
  public id: number;
  public userId: number;
  public star: number;
  public rate: string;
  public createTime: string;
  public modifiedTime: string;
}

export class RateOwnerQC {
  constructor(pageNum,
              pageSize) {
}

}

