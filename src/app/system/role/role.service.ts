import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Api} from "../../common/api";
import {Observable} from "rxjs/Observable";
import {URLSearchParams} from '@angular/http';
import {Result} from "../../common/dto";

@Injectable()
export class RoleService {
  allRoles:Role[];
  constructor(public ajax:Ajax) { }
  findAll(refresh?:boolean):Observable<Result>{
    if(this.allRoles && !refresh){
      //如果有缓存伪造相应
      let ret = new Result(0,'success',this.allRoles);
      //创建Observable对象
      return Observable.from([ret]);
    }
    return this.ajax.get(Api.roleFindAll).filter(ret => {
      if(ret.code == 0 ){
        //设置缓存
        this.allRoles = ret.data;
      }
      return true;
    });
  }
  save(id:string,name:string):Observable<Result>{
    let p = new URLSearchParams();
    if(id){
      p.set("id",id);
    }
    p.set("name",name);
    return this.ajax.post(Api.roleSave, p)
  }
  removeById(id:string):Observable<Result>{
    let p = new URLSearchParams();
    p.set("id",id);
    return this.ajax.deleteByParams(Api.roleRemoveById,p);
  }
  findMenuIds(id:string):Observable<Result>{
    var p = new URLSearchParams();
    p.set("id",id);
    return this.ajax.getByParams(Api.roleFindMenuIds,p);
  }
  updateRoleMenu(roleId,menuIds){
    let p = new URLSearchParams();
    p.set("roleId",roleId);
    p.set("menuIds",menuIds);
    return this.ajax.post(Api.roleUpdateRoleMenu, p)
  }

}
export class Role {
  constructor(public id:number,
              public name:string,
              public creator:number,
              public createTime:string,
              public modifiedTime:string
  ){}
}
