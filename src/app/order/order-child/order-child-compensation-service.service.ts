import {Injectable} from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Api} from "../../common/api";
import {Observable} from "rxjs/Observable";

@Injectable()
export class OrderChildCompensationServiceService {

  constructor(private ajax: Ajax) {
  }

  listOrderChildCompensation(childNo: string): Observable<any> {
    return this.ajax.getByParams(Api.LIST_ORDER_CHILD_COMPENSATION, {childNo: childNo});
  }


}


export class OrderChildCompensation {
  public id: number;
  public childId: number;
  public childNo: string;
  public name: string;
  public value: number;
  public orderNo: string;
  public ownerId: number;
  public createTime: string;
  public modifiedTime: string
}
