import {Injectable} from '@angular/core';
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {Ajax} from "../../common/ajax";

@Injectable()
export class OrderChildService {
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
    {status: 100, description: "收货人确认车辆"},
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

  static orderChildLogTypeList: Array<any> = [
    {type: 1, description: "流程跳转"},
    {type: 2, description: "添加赔偿金"},
    {type: 3, description: "修改赔偿金"},
    {type: 4, description: "货主取消主单剩余货源"},
    {type: 5, description: "货主取消主单剩余货源"},
    {type: 6, description: "司机取消子订单"},
    {type: 7, description: "添加异常申请"},
    {type: 8, description: "货主取消子订单"}
    ];


  constructor(private http: Http, private ajax: Ajax) {
  }

  // 查询子订单列表
  listOrderChild(orderChildQC: OrderChildQC): Observable<any> {
    return this.ajax.getByParams(Api.LIST_ORDER_CHILD, orderChildQC);
  }

  //　查询子订单相关的图片列表
  listOrderChildImage(childNo: string, type: number): Observable<any> {
    return this.ajax.getByParams(Api.LIST_ORDER_CHILD_IMAGE, {childNo: childNo, type: type});
  }

  listOrderChildLog(childNo: string): Observable<any> {
    return this.ajax.getByParams(Api.LIST_ORDER_CHILD_LOG, {childNo: childNo});
  }


}

export class OrderChild {
  public id: number;
  public userId: number;
  public headImg: string;
  public orderId: number;
  public orderNo: string;
  public childNo: string;
  public ownerId: number;
  public ownerCode: number;
  public ownerName: string;
  public truckOwnerId: number;
  public receiveId: number;
  public sendId: number;
  public status: number;
  public orderType: number;
  public driverEvaluate: number;
  public ownerEvaluate: number;
  public remainAmount: number;
  public tradeNo: string;
  public capacity: number;
  public insuranceFee: number;
  public freight: number;
  public compensationFee: number;
  public deposit: number;
  public truckId: number;
  public truckNo: string;
  public truckBrand: string;
  public truckModel: string;
  public truckLoad: number;
  public driverId: number;
  public driverName: string;
  public driverPhone: string;
  public payTime: string;
  public sendTare: number;
  public sendRough: number;
  public sendNet: number;
  public receiveTare: number;
  public receiveRough: number;
  public receiveNet: number;
  public cancelReason: string;
  public ownerRemark: string;
  public driverRemark: string;
  public unloadRemark: string;
  public compensationRemark: string;
  public latestArrivalTime: string;
  public arriveTime: string;
  public loadTime: string;
  public receiveTime: string;
  public unloadTime: string;
  public createTime: string;
  public modifiedTime: string;
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

export class OrderChildImage {
  public id: number;
  public childNo: string;
  public type: number;
  public image: string;
  public createTime: string;
  public modifiedTime: string;
}

export class OrderChildStatus {
  public status: number;
  public description: string;
}

export class OrderChildLog {
  public id: number;
  public childNo: string;
  public createBy: number;
  public createName: string;
  public createPhone: string;
  public createType: number;
  public type: number;
  public remark: string;
  public createTime: string;
  public modifiedTime: string;
}
