import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {Result} from "../../common/dto";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class MenuService {

  constructor(public ajax:Ajax) { }
  findAll():Observable<Result>{
    return this.ajax.get(Api.menuFindAll);
  }
  save(menu:{}):Observable<Result>{
    return this.ajax.post(Api.menuSave, menu)
  }
  removeById(id:string):Observable<Result>{
    let p = new URLSearchParams();
    p.set("id",id);
    return this.ajax.deleteByParams(Api.menuRemoveById,p);
  }

}

