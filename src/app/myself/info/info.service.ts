import { Injectable } from '@angular/core';
import {Api} from "../../common/api";
import {Observable} from "rxjs/Observable";
import {Ajax} from "../../common/ajax";
import {Result} from "../../common/dto";

@Injectable()
export class InfoService {

  constructor(public ajax:Ajax) { }
  myself():Observable<any>{
    return this.ajax.get(Api.adminMyself)
  }
  updateMyself(admin):Observable<Result>{
    return this.ajax.post(Api.adminUpdateMyself,admin);
  }

}
