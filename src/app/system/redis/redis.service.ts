import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Result} from "../../common/dto";
import {Api} from "../../common/api";
import {Ajax} from "../../common/ajax";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class RedisService {

  constructor(public ajax:Ajax) { }

  get(key: string, hashKey: string, type: string):Observable<Result>{
    let p = new URLSearchParams();
    if(hashKey){
      p.set("hashKey",hashKey);
    }
    p.set("key",key);
    p.set("type",type);
    return this.ajax.post(Api.redisGet, p);
  }

}
