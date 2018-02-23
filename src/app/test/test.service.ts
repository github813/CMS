import {Injectable, OnDestroy} from '@angular/core';
import {Http,Headers,Response} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Ajax} from "../common/ajax";
import {Api} from "../common/api";

@Injectable()
export class TestService implements OnDestroy{
  ngOnDestroy(): void {
    console.log("OrderService Destroy");
  }
  private orders:Order[] = [
    new Order(1,"1234567890","xujianke","煤炭",100),
    new Order(2,"1234567891","xujianke2","煤炭",200)
  ];
  private order :Order;
  constructor(public ajax :Ajax) {

  }


  findAll():Observable<any>{
    const params ={ "beginCapacity": 10, "coordinate": [116.383436,39.962882]};
    let headers = new Headers();
    headers.append("userId", '1234');
    return this.ajax.post(Api.getOrderInfoLocationList, params);
  }
  findList(key:string):Order[]{
    return this.orders.filter(order =>{
      return order.name.indexOf(key) >=0;
    })
    //return [new Order(2,"1234567891",key,"煤炭",200];
  }
  getById(id:number):Order{
    let order = this.orders.find(order => order.userId == id);
    if(!order){
      order = new Order(-1,'','','',0);
    }
    return order;
  }
  setOrder(order:Order){
    this.order = order;
  }
  getOrder():Order{
    return this.order;
  }

}
export class Order {
  constructor(
    public userId: number,
    public orderNo: string,
    public name: string,
    public goodsName: string,
    public goodsAmount: number
  ){}
}
