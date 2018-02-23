import {Component, OnInit} from '@angular/core';
import {OrderInfo, OrderInfoService, OwnerStaff} from "../order-info.service";
import {ActivatedRoute, Params, Router} from "@angular/router";


@Component({
  selector: 'app-order-info-detail',
  templateUrl: './order-info-detail.component.html',
  styleUrls: ['./order-info-detail.component.css']
})
export class OrderInfoDetailComponent implements OnInit {
  orderInfo: OrderInfo;
  public ownerId;
  public addressId;
  public type;

  public ownerStaffList: Array<OwnerStaff>;

  constructor(private routeInfo: ActivatedRoute,
              private router: Router,
              private orderInfoService: OrderInfoService) {
  }

  ngOnInit() {

    this.routeInfo.params.subscribe((params: Params) => {
      this.orderInfo = new OrderInfo();
      Object.assign(this.orderInfo, JSON.parse(params["orderInfo"]));
    });
  }

  see(id,type) {
    this.ownerId = this.orderInfo.userId;
    this.addressId = this.orderInfo.sendAddressId;
    this.type=type;
    this.orderInfoService.list(this.ownerId, id, type)
      .subscribe(result => {
        console.log(result)
        this.ownerStaffList = result.data;
      });
  }

  showOrderTrade(orderNo: string) {
    this.router.navigateByUrl("/order/orderTrade/" + orderNo);
  }


  //返回到列表页
  goBack() {
     this.router.navigate(['order/orderInfo']);
      window.history.go(-1);
  }
}


