import {Component, OnInit} from '@angular/core';
import {OrderChild, OrderChildImage, OrderChildService} from "../order-child-service";
import {DriverInfo, DriverService} from "../../../user/user/driver/driver.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {OrderInfo, OrderInfoService} from "../../order-info/order-info.service";
import {ImageCarouse} from "../../../component/image-carousel/image-carousel.component";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../common/dto";
import {
  OrderChildCompensation,
  OrderChildCompensationServiceService
} from "../order-child-compensation-service.service";
declare var $;
@Component({
  selector: 'app-order-child-detail',
  templateUrl: './order-child-detail.component.html',
  styleUrls: ['./order-child-detail.component.css']
})
export class OrderChildDetailComponent implements OnInit {
  // 子订单详情
  orderChild: OrderChild = new OrderChild();
  // 接单人信息
  userInfo: DriverInfo;
  // 车主信息
  truckOwner: DriverInfo;
  // 货源信息
  orderInfo: OrderInfo;
  // 图片弹窗列表
  imageCarouse: ImageCarouse;
  //扣款项列表
  orderChildCompensationList: Array<OrderChildCompensation>;

  // 传递给result模态框的结果
  result: Result;
  // 控制result模态框的显示
  resultMsgStatus: boolean;

  //从列表页导航过来时的页码
  // pageNum: number;
  //从列表页导航过来时的页容量
  // pageSize: number;


  constructor(private routeInfo: ActivatedRoute,
              private router: Router,
              private orderInfoService: OrderInfoService,
              private orderChildService: OrderChildService,
              private driverService: DriverService,
              private orderChildCompensationService: OrderChildCompensationServiceService) {
  }

  // 显示货源
  showOrderInfo() {
    this.orderInfoService.getOrderInfo(this.orderChild.orderNo).catch(error => Observable.throw(error)).subscribe(
      (result) => {
        if (result.code == 0) {
          this.orderInfo = result.data
        } else {
          this.popResult(null, result);
        }
      },
      error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
    );
  }

  //返回到列表页
  goBack() {
    this.router.navigate(['order/orderChild'])
  }

  // 显示接单人
  showUser() {
    this.driverService.findByDriverId(this.orderChild.userId).catch(error => Observable.throw(error)).subscribe(
      (result) => {
        if (result.code == 0) {
          this.userInfo = result.data
        } else {
          this.popResult(null, result);
        }
      },
      error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
    );
  }

  // 显示车主信息
  showTruckOwner() {
    this.driverService.findByDriverId(this.orderChild.truckOwnerId).catch(error => Observable.throw(error)).subscribe(
      (result) => {
        if (result.code == 0) {
          this.truckOwner = result.data
        } else {
          this.popResult(null, result);
        }
      },
      error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
    );
  }

  //扣款项列表
  showCompensationList() {
    this.orderChildCompensationService.listOrderChildCompensation(this.orderChild.childNo).catch(error => Observable.throw(error)).subscribe(
      result => {
        if (result.code == 0) {
          if (result.data.length > 0) {
            console.log(result.data);
            this.orderChildCompensationList = result.data;
            console.log(this.orderChildCompensationList);
          } else {
            this.popResult(null, {code: 1, msg: '没有扣款项'})
          }
        } else {
          this.popResult(null, result);
        }
      },
      error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
    );
  }

  showOrderTrade(orderNo: string) {
    this.router.navigateByUrl("/order/orderTrade/" + orderNo);
  }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      Object.assign(this.orderChild, JSON.parse(params["orderChild"]));
      // this.pageNum = params["pageNum"];
      // this.pageSize = params["pageSize"];
    });

  }

  // 弹出结果提示模态框
  popResult(successMsg: string, result: Result) {
    console.log(result);
    if (result.code == 0) {
      result.msg = successMsg;
    }
    this.result = result;
    this.resultMsgStatus = true;
    setTimeout(() => {
      this.resultMsgStatus = false;
    }, 2000);
  }

  showImage(type: number) {
    this.orderChildService.listOrderChildImage(this.orderChild.childNo, type).subscribe((result) => {
      if (result.data.imageList.length > 0) {
        this.imageCarouse = new ImageCarouse();
        this.imageCarouse.domain = result.data.domain;
        this.imageCarouse.imageList = new Array;
        for (let i = 0; i < result.data.imageList.length; i++) {
          this.imageCarouse.imageList.push(result.data.imageList[i].image);
        }
        switch (type) {
          case 1:
            this.imageCarouse.title = "货主装车备注";
            break;
          case 2:
            this.imageCarouse.title = "司机装车备注";
            break;
          case 3:
            this.imageCarouse.title = "货主卸货备注";
            break;
          case 4:
            this.imageCarouse.title = "拒绝装车备注";
            break;
          case 5:
            this.imageCarouse.title = "异常信息备注";
            break;
          case 6:
            this.imageCarouse.title = "收货赔偿备注";
        }
      } else {
        this.imageCarouse = null;
        this.popResult(null, {code: 1, msg: '没有备注图片'})
      }
    });
  }


}
