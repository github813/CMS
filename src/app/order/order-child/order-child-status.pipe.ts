import {Pipe, PipeTransform} from '@angular/core';
import {OrderChildService, OrderChildStatus} from "./order-child-service";
import {isNullOrUndefined, isUndefined} from "util";

@Pipe({
  name: 'orderChildStatus'
})
export class OrderChildStatusPipe implements PipeTransform {

  // 子订单的状态列表
  orderChildStatusList: Array<OrderChildStatus> = OrderChildService.orderChildStatusList;

  transform(value: any, args?: any): any {
    let status: OrderChildStatus = this.orderChildStatusList.find((orderChildStatus) => {
      if (orderChildStatus.status == value) {
        return true;
      }
    });
    return isNullOrUndefined(status) ? "未知" : status.description;
  }

}
