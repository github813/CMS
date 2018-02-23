import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {OrderChild, OrderChildService} from "../../../../order/order-child/order-child-service";
import {Page} from "../../../../component/pagination/pagination.component";

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

  public id:number;

  orderChildQCForm: FormGroup;

  orderChildList: Array<OrderChild>;

  constructor(private router:Router,
              private orderChildService: OrderChildService,
              private routerInfo: ActivatedRoute,
              formBuilder: FormBuilder) {
    this.orderChildQCForm = formBuilder.group({
      childNo: [''],
      ownerName: [''],
      truckNo: [''],
      driverName: [''],
      driverPhone: [''],
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
      this.listOrderChild();
    }else {

      alert("信息有误");
    }
  }

  showOrderDetail(id:number){
    this.router.navigateByUrl("/user/user/driver/order-detail/"+id);
  }

  showUserDetail(id:number){
    this.router.navigateByUrl("/user/user/driver/user-detail/"+id);
  }

  showEvaluateDetail(id:number){
    this.router.navigateByUrl("/user/user/driver/evaluate-detail/"+id);
  }

  toOrderChildDetail(orderChild: OrderChild) {
    this.router.navigate(['/order/orderChild/' + orderChild.childNo, {orderChild: JSON.stringify(orderChild)}]);
  }


  searchOrderChildList() {
    this.pageNum = 1;
    this.listOrderChild();
  }

  listOrderChild() {
    this.orderChildQCForm.get("pageNum").setValue(this.pageNum);
    this.orderChildQCForm.get("pageSize").setValue(this.pageSize);
    const [fromCreateTime, toCreateTime] = this.orderChildQCForm.get("timeRangeInput").value.split("~");
    this.orderChildQCForm.get("fromCreateTime").setValue(fromCreateTime);
    this.orderChildQCForm.get("toCreateTime").setValue(toCreateTime);
    this.orderChildQCForm.get("userId").setValue(this.id);
    this.orderChildService.listOrderChild(this.orderChildQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.orderChildList = result.data.list;
    });
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listOrderChild();
  }

}
