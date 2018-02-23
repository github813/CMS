import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Api} from "../../common/api";
import {Observable} from "rxjs/Observable";
import {Md5} from "ts-md5/dist/md5";
import {Result} from "../../common/dto";
import {URLSearchParams} from '@angular/http';
//md5 加密

@Injectable()
export class StaffService {

  constructor(public ajax:Ajax) { }
  findAll(page:number):Observable<any>{
    return this.ajax.getByParams(Api.adminAll,{page:page});
  }
  findList(page:number, search:string,roleId:number,departId:number):Observable<any>{
    let param = {page,search,roleId,departId};
    console.log(param);
    return this.ajax.post(Api.adminList,param);
  }
  saveAdmin(admin:Admin):Observable<any>{
    admin.pwd= Md5.hashStr(admin.pwd).toString();
    return this.ajax.post(Api.adminSave,admin);
  }
  checkUname(uname:string):Observable<any>{
    return this.ajax.getByParams(Api.adminCheckUname,{uname:uname})
  }
  findById(id:number):Observable<any>{
    return this.ajax.getByParams(Api.adminFindById,{id:id})
  }
  updateAdmin(admin):Observable<Result>{
    return this.ajax.post(Api.adminUpdate,admin);
  }
  updateStatus(id:string,status:string):Observable<Result>{
    let p = new URLSearchParams();
    p.set("id",id);
    p.set("status",status);
    return this.ajax.post(Api.adminUpdateStatus, p);
  }
}

export class Admin{
  constructor(
    public id:number,
    public uname:string,
    public pwd:string,
    public name:string,
    public mobile:string,
    public email:string,
    public roleId:string,
    public department:string,
    public creator:number,
    public createTime:string,
    public modifiedTime:string
  ) { }
}
