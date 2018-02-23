import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {Ajax} from "../../common/ajax";

@Injectable()
export class OrderSyncService {
  // 货源的状态列表
  static orderInfoStatusList: Array<OrderInfoStatus> = [
    {status: null, description: "全部"},
    {status: 1, description: "未发布"},
    {status: 2, description: "已发布"},
    {status: 10, description: "运输中"},
    {status: 11, description: "暂停"},
    {status: 20, description: "支付"},
    {status: 30, description: "完成"},
    {status: 40, description: "取消"},
    {status: 50, description: "系统取消"},
    {status: 60, description: "支付失败"},
  ];


  constructor(public ajax: Ajax) {
  }
  //查看货源列表
  listOrderInfo(orderInfoQC: OrderInfoQC): Observable<any> {
    return this.ajax.getByParams(Api.LIST_ORDER_MONGO, orderInfoQC);
  }

  //同步mongo状态
  sync(orderNo: string): Observable<any> {
    return this.ajax.post(Api.MONGO_SYNC, orderNo);
  }

}

export class OrderInfo {
  public id: number;
  public userId: number; //用户id
  public userCode: number; //货主支付code
  public name: string; //货主姓名
  public phone: string; //货主手机号
  public orderNo: string; //订单编号
  public goodsName: string; //货物名称
  public goodsAmount: number; //总货物数量
  public goodsResidue: number; //剩余货物数量
  public orderStatus: number; //订单状态1未发布2已发布3运输中4暂停5完成6取消
  public mongoStatus: number; //订单状态1未发布2已发布3运输中4暂停5完成6取消

}

export class OrderInfoQC {
  public  id: number;
  public userId: number;
  public  orderNo: string;
  public  name: string;
  public  phone: string;
  public  status: number;
  public orderType: number;
  public  goodsName: string;
  public  minGoodsAmount: number;
  public  maxGoodsAmount: number;
  public  minGoodsResidue: number;
  public  maxGoodsResidue: number;
  public  minGoodsPrice: number;
  public  maxGoodsPrice: number;
  public  minFreightPrice: number;
  public  maxFreightPrice: number;
  public  insurance: number;
  public  minInsuranceFee: number;
  public  maxInsuranceFee: number;
  public  fromCreateTime: string;
  public  toCreateTime: string;
}


export class OrderInfoStatus {
  public status: number;
  public description: string;
}
