import { Injectable } from '@angular/core';
import { Ajax } from "../../common/ajax";
import { Api } from "../../common/api";
import { Observable } from "rxjs/Observable";

@Injectable()
export class ExpGetService {

    constructor(private ajax: Ajax) {
    }
    driverExpList() :Observable<any> {
        return this.ajax.get(Api.driverExpList)
    }
    ownerExpList():Observable<any> {
        return this.ajax.get(Api.ownerExpList)
    }
    expConfig(name,params):Observable<any> {
        return this.ajax.post(name,params);
    }
    driverExpDelete(expCode):Observable<any> {
        return this.ajax.delete(Api.driverExpDelete + "?expCode=" + expCode)
    }
    ownerExpDelete(expCode): Observable<any> {
        return this.ajax.delete(Api.ownerExpDelete + "?expCode=" + expCode)
    }
}
export class Save {
    public add={
        "expCode": "string",
        "expLimitType": "D",
        "expLimitValue": 0,
        "expName": "string",
        "expValue": 0,
        "hasLimit": 0,
        "isFixedValue": 0,
        "performTimes": 0
    }
}

