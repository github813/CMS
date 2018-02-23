import { Injectable } from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Api} from "../../../common/api";
import {Observable} from "rxjs/Observable";

@Injectable()
export class DriverService {

  constructor(private ajax: Ajax) {
  }

  listDriverGrades(): Observable<any> {
    return this.ajax.get(Api.LIST_DRIVER_GRADE);
  }

  saveDriverGrade(driverGrade: DriverGrade): Observable<any> {
    return this.ajax.post(Api.saveDriverGrade, driverGrade);
  }

  updateDriverGrade(value:string): Observable<any> {
    // let p = new URLSearchParams();
    // p.set("id",id.toString());
    //
    return this.ajax.put(Api.updateDriverGrade, value);
  }
  deleteDriverGrade(id: number): Observable<any> {
    let params = {"id":id}
    return this.ajax.deleteByParams(Api.deleteDriverGrade, params);
  }
  getDriverGradeById(id: number): Observable<any> {
    let params = {"id":id};
    return this.ajax.getByParams(Api.getDriverUserGradeById,params);
  }
}

export class DriverGrade{
  public id: number;
  public creatorId: number;
  public gradeNo: number;
  public gradeName: string;

  public gradeExp: number;
  public informationRate: string;
  public integralRate: string;
  public mallRate: number;
  public superService: number;
  public creditCeiling: number;
  public pushPriority: number;
  public createTime: string;
  public modifiedTime: string;
}
