import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";
import {OrderInfoStatus, OrderSyncService} from "./order-sync.service";

@Pipe({
  name: 'orderSync'
})
export class OrderSyncPipe implements PipeTransform {

  orderInfoStatusList: Array<OrderInfoStatus> = OrderSyncService.orderInfoStatusList;

  transform(value: any, args?: any): any {
    let status: OrderInfoStatus =  this.orderInfoStatusList.find((orderInfoStatus) => {
      if (orderInfoStatus.status == value) {
        return true;
      }
    });
    return isNullOrUndefined(status) ? "未知" : status.description;
  }

}
