import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";
import {Ajax} from "../../common/ajax";

@Injectable()
export class OrderInfoService {
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
    return this.ajax.getByParams(Api.LIST_ORDER_INFO, orderInfoQC);
  }
  //获取货源详情
  getOrderInfo(orderNo: string): Observable<any> {
    return this.ajax.getByParams(Api.GET_ORDER_INFO, {orderNo: orderNo});
  }
  //查询联系人
  public list(ownerId: number, addressId: number, type: number): Observable<any>{
    let query = {ownerId: ownerId, addressId: addressId, type: type};
    return this.ajax.getByParams(Api.list, query);

  }
  /**
   * 一键取消主订单
   * @param orderNo
   * @returns {Observable<Result>}
   * @author wangjianxin
   */
  cancelOrder(orderNo: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("orderNo", orderNo);
    return this.ajax.post(Api.CANCEL_ORDER, formData);
  }

}

export class OrderInfo {
  public id: number;
  public userId: number; //用户id
  public userCode: number; //货主支付code
  public name: string; //货主姓名
  public phone: string; //货主手机号
  public headImg: string; //头像
  public orderNo: string; //订单编号
  public goodsName: string; //货物名称
  public goodsAmount: number; //总货物数量
  public goodsResidue: number; //剩余货物数量
  public goodsUnit: string; //货物计量单位
  public goodsPrice: number; //货物价值（分）
  public goodsSale: number; //损耗价格
  public freightPrice: number; //货物运费单价（分）
  public insurance: number; //是否担保 0不担保1担保
  public insuranceFee: number; //担保费单位分
  public ownerDeposit: number; //货主缴纳押金
  public tradeNo: string; //交易单号
  public endTime: string; //截止日期
  public latestArrivalTime: string; //司机的最晚到达时间
  public orderStatus: number; //订单状态1未发布2已发布3运输中4暂停5完成6取消
  public orderType: number;
  public cancelReason: string;
  public publishTime: string; //发布货源时间
  public sendId: number; //发货人ID
  public sendAddressId:number;
  public sendName: string; //发货人姓名
  public sendPhone: string; //发货人手机号
  public sendCompany: string; //发货单位
  public sendProvince: string; //货源所在省份
  public sendCity: string; //货源所在城市
  public sendCounty: string; //货源所在区县
  public sendTown: string; //货源所在乡镇
  public sendAddress: string; //货源所在详细地址
  public sendLongitude: number; //货源经度
  public sendLatitude: number; //货源纬度
  public receiveId: number; //收货人ID
  public receiveAddressId:number;
  public receiveName: string; //收货人姓名
  public receivePhone: string; //收货人手机号
  public receiveCompany: string; //收货单位
  public receiveProvince: string; //收货人所在省
  public receiveCity: string; //收货人所在城市
  public receiveCounty: string; //收货人所在区县
  public receiveTown: string; //收货人所在乡镇
  public receiveAddress: string; //收货人所在详细地址
  public receiveLongitude: number; //收货经度
  public receiveLatitude: number; //收货纬度
  public distance: number; //运输距离单位公里
  public labels: string; //标签 分隔符用|
  public remark: string; //订单备注
  public createTime: string; //创建时间
  public modifiedTime: string; //修改时间

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

export class OwnerStaff{
  public id : number;
  public addressId : number;
  public userId : number;
  public contactId : number;
  public type : number;
  public main : number;
  public name : string;
  public phone : string;
}





