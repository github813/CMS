import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Result} from "../../common/dto";
import {Api} from "../../common/api";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class DepartmentService {
  allDepartments:Department[];
  constructor(public ajax:Ajax) { }
  findAll():Observable<Result>{
    if(this.allDepartments){
      //如果有缓存伪造相应
      let ret = new Result(0,'success',this.allDepartments);
      //创建Observable对象
      return Observable.from([ret]);
    }
    return this.ajax.get(Api.departmentFindAll).filter(ret => {
      if(ret.code == 0){
        this.allDepartments = ret.data;
      }
      return true;
    });
  }
  save(id:string,name:string,pid:string):Observable<Result>{
    let p = new URLSearchParams();
    if(id){
      p.set("id",id);
    }
    p.set("pid",pid);
    p.set("name",name);
    return this.ajax.post(Api.departmentSave, p)
  }
  removeById(id:string):Observable<Result>{
    let p = new URLSearchParams();
    p.set("id",id);
    return this.ajax.deleteByParams(Api.departmentRemoveById,p);
  }

}

export class Department{
  constructor(public id:number,public pid:number,public name:string,public creator:number){
  }
}
