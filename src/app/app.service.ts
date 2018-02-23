import {Injectable} from '@angular/core';
import {ComponentEvent, Menu, Result} from "./common/dto";
import {Api} from "./common/api";
import {Ajax} from "./common/ajax";
import {Observable} from "rxjs/Observable";

@Injectable()
export class AppService {
  allMenus: Menu[];
  listenerArray:EventListener[];
  isLoadingMenus:boolean = false;
  constructor(public ajax:Ajax) {
    this.listenerArray =new Array<EventListener>();
  }

  /**
   * 根据登录权限查询菜单
   * @returns {any}
   */
  findMenu():Observable<Result>{
    if(this.isLoadingMenus){
      let ret = new Result(0,'success');
      return Observable.from([ret]).delay(700);
    }
    if(this.allMenus){
      //如果有缓存伪造相应
      let ret = new Result(0,'success',this.allMenus);
      //创建Observable对象
      return Observable.from([ret]);
    }
    this.isLoadingMenus = true;
    return this.ajax.get(Api.adminFindMenu).filter(ret =>{
      if(ret.code == 0 ){
        //设置缓存
        this.allMenus = ret.data;
      }
      this.isLoadingMenus = false;
      return true;
    });

  }

  /**
   * 登录
   * @param login
   * @returns {Observable<any>}
   */
  login(login):Observable<Result>{
    return this.ajax.post(Api.adminLogin,login);
  }

  /**
   * 添加时间监听 在组件的构造函数中手动执行
   * @param componentName
   * @param call
   */
  addListenEvent(componentName:string,call:(event:ComponentEvent)=>void){

    let listener = this.listenerArray.find(val =>{
      if(val.name == componentName){
        return true;
      }
      return false;
    });
    if(listener == null){
      listener = new EventListener(componentName,call);
      this.listenerArray.push(listener);
    }
  }

  /**
   * 发送事件
   * @param componentEvent
   */
  sendEvent(componentEvent:ComponentEvent){
    let listener = this.listenerArray.find(val =>{
      if(val.name == componentEvent.to){
        return true;
      }
      return false;
    });
    if(listener == null )return;
    listener.call(componentEvent);
  }

  /**
   * 删除事件监听 需在组件销毁时手动执行
   * @param componentName
   */
  removeListenEvent(componentName:string){
    let index:number = -1;
    this.listenerArray.find((val,i) =>{
      if(val && val.name == componentName){
        index = i;
        return true;
      }
      return false;
    });
    if(index > -1){
      this.listenerArray.splice(index);
    }
  }
  

}

export class EventListener {
  constructor(public name:string,public call:(event:ComponentEvent)=>void) {}
}





