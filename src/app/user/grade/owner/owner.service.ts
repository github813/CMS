import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Ajax} from "../../../common/ajax";
import {Api} from "../../../common/api";

@Injectable()
export class OwnerService {

  constructor(private ajax: Ajax) {
  }

  listOwnerGrades(): Observable<any> {
    return this.ajax.get(Api.LIST_OWNER_GRADE);
  }

  saveOwnerGrade(ownerGrade: OwnerGrade): Observable<any> {
    return this.ajax.post(Api.saveOwnerGrade, ownerGrade);
  }

  updateOwnerGrade(value:string): Observable<any> {
    // let p = new URLSearchParams();
    // p.set("id",id.toString());
    // p.set("value",value);
    return this.ajax.put(Api.updateOwnerGrade, value);
  }
  OwnerUserGradeDel(id:number): Observable<any>{
     return  this.ajax.delete(Api.OwnerUserGradeDel +"?id="+id+"");
  }
  getOwnerGradeById(id: number): Observable<any> {
    let params = {"id":id};
    return this.ajax.getByParams(Api.getOwnerUserGradeById,params);
  }
}


export class OwnerGrade{
  public id: number;
  public creatorId: number;
  public gradeNo: number;
  public gradeName: string;

  public gradeExp: number;
  public informationRate: string;
  public integralRate: string;
  public insuranceRate: string;
  public superService: number;
  public industryInfo: number;
  public softwareCustom: number;
  public createTime: string;
  public modifiedTime: string;
}
