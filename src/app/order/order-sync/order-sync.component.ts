import { Component, OnInit } from '@angular/core';
import {OrderInfo, OrderSyncService} from "./order-sync.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-sync',
  templateUrl: './order-sync.component.html',
  styleUrls: ['./order-sync.component.css']
})
export class OrderSyncComponent implements OnInit {

  orderInfoQCForm: FormGroup;

  orderInfoList: Array<OrderInfo>;

  constructor(private orderSyncService: OrderSyncService,
              formBuilder: FormBuilder,
              private router: Router,
              private routeInfo: ActivatedRoute) {
    this.orderInfoQCForm = formBuilder.group({
      orderNo: [''],
      name: [''],
      phone: [''],
      status: [''],
      orderType: [''],
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
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.listOrderInfo();
  }

  listOrderInfo() {
    this.orderSyncService.listOrderInfo(this.orderInfoQCForm.value).subscribe((result) => {
      this.orderInfoList = result.data;
      console.log(this.orderInfoList);
    });
  }

  sync(orderNo: string){
    this.orderSyncService.sync(orderNo).subscribe((result) => {
      if (result.code == 0) {
        alert("success");
        window.location.reload();
        // this.listOrderInfo();
      }else{
        alert(result.msg);
      }
    });
  }

}
