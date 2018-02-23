import { Pipe, PipeTransform } from '@angular/core';
import {isNullOrUndefined} from "util";
import {OrderCompleteService} from "./order-complete.service";
import {OrderChildStatus} from "../order-child/order-child-service";

@Pipe({
  name: 'orderComplete'
})
export class OrderCompletePipe implements PipeTransform {

  orderInfoStatusList: Array<OrderChildStatus> = OrderCompleteService.orderChildStatusList;

  transform(value: any, args?: any): any {
    let status: OrderChildStatus =  this.orderInfoStatusList.find((orderChildStatus) => {
      if (orderChildStatus.status == value) {
        return true;
      }
    });
    return isNullOrUndefined(status) ? "未知" : status.description;
  }

}
