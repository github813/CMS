import {Pipe, PipeTransform} from '@angular/core';
import {OrderChildService} from "./order-child-service";
import {isNullOrUndefined, isUndefined} from "util";

@Pipe({
  name: 'orderChildLogType'
})
export class OrderChildLogTypePipe implements PipeTransform {
  orderChildLogTypeList: Array<any> = OrderChildService.orderChildLogTypeList;

  transform(value: any, args?: any): any {
    let logType: any = this.orderChildLogTypeList.find((orderChildLogType) => {
        if (orderChildLogType.type == value) {
          return true;
        }
      }
    );
    return isNullOrUndefined(logType) ? "未定义" : logType.description;
  }

}
