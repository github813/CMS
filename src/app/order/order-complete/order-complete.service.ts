import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {Ajax} from "../../common/ajax";
import {OrderChildStatus} from "../order-child/order-child-service";
import {URLSearchParams} from '@angular/http';

@Injectable()
export class OrderCompleteService {
  // 子订单的状态列表
  static orderChildStatusList: Array<OrderChildStatus> = [
    {status: null, description: "全部"},
    {status: 1, description: "新创建"},
    {status: 2, description: "接单成功"},
    {status: 3, description: "前往货源地"},
    {status: 4, description: "到达货源地"},
    {status: 50, description: "发货人确认车辆"},
    {status: 51, description: "发货人装车"},
    {status: 52, description: "司机确认装车"},
    {status: 53, description: "前往目的地"},
    {status: 54, description: "到达目的地"},
    {status: 100, description: "货主确认车辆"},
    {status: 101, description: "收货人确认收货"},
    {status: 102, description: "司机确认收货"},
    {status: 103, description: "已交货"},
    {status: 120, description: "抢单支付中"},
    {status: 121, description: "发货人装车支付中"},
    {status: 122, description: "确认收货支付中"},
    {status: 150, description: "完成"},
    {status: 151, description: "评价完成"},
    {status: 200, description: "拒绝装车"},
    {status: 210, description: "货主取消"},
    {status: 211, description: "司机取消"},
    {status: 212, description: "客服取消"},
    {status: 213, description: "系统取消"},
    {status: 220, description: "卸货协商中"},
    {status: 221, description: "客服处理完毕"},
    {status: 222, description: "装货协商中"},
    {status: 230, description: "司机接单支付失败"},
    {status: 231, description: "发货人装车调整支付失败"},
    {status: 232, description: "收货人确认收货支付失败"},
  ];

  constructor(private ajax: Ajax) {
  }

  // 查询子订单列表
  listOrderChild(orderChildQC: OrderChildQC): Observable<any> {
    return this.ajax.getByParams(Api.LIST_ORDER_CHILD, orderChildQC);
  }

  // 一键取消
  completeOrder(childNo:string): Observable<any> {
    let p = new URLSearchParams();
    p.set("childNo",childNo);
    return this.ajax.put(Api.COMPLETE_ORDER, p);
  }

  // 修改订单状态
  modifyToStatus(childNo:string): Observable<any> {
    let p = new URLSearchParams();
    p.set("childNo",childNo);
    return this.ajax.put(Api.UPDATE_STATUS, p);
  }
// 修改子单载重
  updatechildTruckLoad(childNo:string,truckLoad:string): Observable<any> {
    let p = new URLSearchParams();
    p.set("childNo",childNo);
    p.set("truckLoad",truckLoad)
    return this.ajax.put(Api.updatechildTruckLoad, p);
  }
}

export class OrderChildQC {
  constructor(userId: number,
              orderNo: string,
              childNo: string,
              ownerId: number,
              ownerName: string,
              truckOwnerId: number,
              receiveId: number,
              insured: number,
              compensative: number,
              sendId: number,
              truckId: number,
              truckNo: string,
              driverId: number,
              driverName: string,
              driverPhone: string,
              status: number,
              fromCreateTime: string,
              toCreateTime: string,
              pageNum,
              pageSize) {

  }
}

