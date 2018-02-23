import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";

@Injectable()
export class BankCardService {

  constructor(public ajax:Ajax) { }
  findList(param):Observable<any>{
    return this.ajax.post(Api.bankCardList, param);
  }
  save(form):Observable<any>{
    return this.ajax.post(Api.bankCardSave,form);
  }

}
export class BankCard{
  constructor(public id:number,
              public userCode:number,
              public name:string,
              public cardNo:string,
              public bankCode:string,
              public faster:number,
              public bindingStatus:string,
              public snBinding:string,
              public createTime:string
  ){}
}
