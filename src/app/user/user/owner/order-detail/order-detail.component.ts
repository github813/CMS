import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderInfo, OrderInfoService} from "../../../../order/order-info/order-info.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../../component/pagination/pagination.component";
declare var $: any;

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit {

  pageNum: number;
  pageSize: number;
  totalNum: number;
  totalPages: number;

  orderInfoQCForm: FormGroup;

  orderInfoList: Array<OrderInfo>;

  toOrderInfoDetail(orderInfo: OrderInfo) {
    this.router.navigate(['/order/orderInfo/' + orderInfo.orderNo, {orderInfo: JSON.stringify(orderInfo)}]);

  }

  public id:number;

  constructor(private router:Router,
              private orderChildService: OrderInfoService,
              private routerInfo: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.orderInfoQCForm = formBuilder.group({
      orderNo: [''],
      name: [''],
      phone: [''],
      status: [''],
      goodsName: [''],
      minGoodsAmount: [''],
      maxGoodsAmount: [''],
      minGoodsResidue: [''],
      maxGoodsResidue: [''],
      minGoodsPrice: [''],
      maxGoodsPrice: [''],
      minFreightPrice: [''],
      maxFreightPrice: [''],
      insurance: [''],
      minInsuranceFee: [''],
      maxInsuranceFee: [''],
      fromCreateTime: [''],
      toCreateTime: [''],
      timeRangeInput: [''],
      userId: [''],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    if(this.id){
      this.listOrderInfo();
    }else {
      alert("信息有误");
    }
  }

  showUserDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/owner-detail/"+id);
  }

  showOrderDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/order-detail/"+id);
  }

  showEvaluateDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/evaluate-detail/"+id);
  }
  showAddressDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/address-detail/"+id);
  }
  showBlackDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/black-detail/"+id);
  }
  chooseInsurance() {
    this.orderInfoQCForm.get("insurance").setValue($("#insurance").val());
  }

  chooseStatus() {
    this.orderInfoQCForm.get("status").setValue($("#status").val());
  }

  listOrderInfo() {
    this.orderInfoQCForm.get("pageNum").setValue(this.pageNum);
    this.orderInfoQCForm.get("pageSize").setValue(this.pageSize);
    const [fromCreateTime, toCreateTime] = this.orderInfoQCForm.get("timeRangeInput").value.split("~");
    this.orderInfoQCForm.get("fromCreateTime").setValue(fromCreateTime);
    this.orderInfoQCForm.get("toCreateTime").setValue(toCreateTime);
    this.orderInfoQCForm.get("userId").setValue(this.id);
    this.orderChildService.listOrderInfo(this.orderInfoQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.orderInfoList = result.data.list;
    });
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listOrderInfo();
  }

  searchOrderChildList() {
    this.pageNum = 1;
    this.listOrderInfo();
  }

}
