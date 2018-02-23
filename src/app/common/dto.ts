/**
 * Created by xujianke on 2017/6/22.
 */
export class Result {
  constructor(public code:number,public msg:string,public data?:any) {}
}
export class ComponentEvent {
  constructor(public from:any,public to:string, public name:string, public data?:any) {}
}

export class ModalStatus<T> {
  constructor(public isShow:boolean, public data:T) {}
}

export class Menu{
  constructor(public id:number,
              public pid:number,
              public title:string,
              public type:number,
              public status:number,
              public link:string,
              public showOrder:number,
              public cssClass:string,
              public creator:number,
              public child:Menu[]){
  }
}
