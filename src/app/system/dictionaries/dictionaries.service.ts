import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class DictionariesService {
  constructor(private ajax: Ajax) {
  }

  listSystemDictionaries(systemDictionariesQC:SystemDictionariesQC): Observable<any> {
    return this.ajax.getByParams(Api.listSystemDictionaries,systemDictionariesQC);
  }

  saveSystemDictionaries(systemDictionaries: SystemDictionaries): Observable<any> {
    return this.ajax.post(Api.saveSystemDictionaries, systemDictionaries);
  }

  deleteSystemDictionaries(id: number): Observable<any> {
    let params = {"id":id}
    return this.ajax.deleteByParams(Api.deleteSystemDictionaries, params);
  }

  updateSystemDictionaries(id: number,value:string): Observable<any> {
    let p = new URLSearchParams();
    p.set("id",id.toString());
    p.set("value",value);
    return this.ajax.post(Api.updateSystemDictionaries, p);
  }

  getSystemDictionariesById(id: number): Observable<any> {
    let params = {"id":id};
    return this.ajax.getByParams(Api.getSystemDictionariesById,params);
  }

}

export class SystemDictionaries {
  public id: number;
  public key: string;
  public value: string;
  public content: string;
  public createTime: string;
  public modifiedTime: string;
}

export class SystemDictionariesQC {
  constructor(pageNum,
              pageSize) {
  }
}
