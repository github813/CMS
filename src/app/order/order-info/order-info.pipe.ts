import { Pipe, PipeTransform } from '@angular/core';
import {OrderInfoService, OrderInfoStatus} from "./order-info.service";
import {isNullOrUndefined} from "util";

@Pipe({
  name: 'orderInfo'
})
export class OrderInfoPipe implements PipeTransform {

  orderInfoStatusList: Array<OrderInfoStatus> = OrderInfoService.orderInfoStatusList;

  transform(value: any, args?: any): any {
    let status: OrderInfoStatus =  this.orderInfoStatusList.find((orderInfoStatus) => {
      if (orderInfoStatus.status == value) {
        return true;
      }
    });
    return isNullOrUndefined(status) ? "未知" : status.description;
  }

}
