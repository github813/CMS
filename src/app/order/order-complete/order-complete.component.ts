import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {OrderChild, OrderChildStatus} from "../order-child/order-child-service";
import {OrderCompleteService} from "./order-complete.service";
import {isNullOrUndefined} from "util";
import {Observable} from "rxjs/Observable";
import {ComponentEvent, Result} from "../../common/dto";
import {Page} from "../../component/pagination/pagination.component";
import {SessionStorage} from "../../common/session_storage";
import {AppService} from "../../app.service";
declare var $: any;
@Component({
  selector: 'app-order-complete',
  templateUrl: './order-complete.component.html',
  styleUrls: ['./order-complete.component.css']
})
export class OrderCompleteComponent implements OnInit {
  public childload;
  // 总记录数
  totalNum: number;
  // 总记录页数
  totalPages: number;

  // 查询表单
  orderChildQCForm: FormGroup;

  // 子订单查询结果
  orderChildList: Array<OrderChild>;

  // 子订单的状态列表
  orderChildStatusList: Array<OrderChildStatus> = OrderCompleteService.orderChildStatusList;

  // 传递给result模态框的结果
  result: Result;
  // 控制result模态框的显示
  resultMsgStatus: boolean;

  loading:boolean = false;

  clickIndex:number = 0;

  ngOnInit() {
    this.listOrderChild();
  }

  constructor(private orderCompleteService: OrderCompleteService, formBuilder: FormBuilder, private router: Router, private routeInfo: ActivatedRoute,public appService:AppService) {
    this.orderChildQCForm = formBuilder.group({
      childNo: ['', [Validators.minLength(17), Validators.maxLength(17)]],
      ownerName: [''],
      truckNo: [''],
      driverName: [''],
      driverPhone: [''],
      status: [''],
      orderType: [''],
      fromCreateTime: [''],
      toCreateTime: [''],
      timeRangeInput: [''],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  //查询子订单列表
  listOrderChild() {
    const [fromCreateTime, toCreateTime] = this.orderChildQCForm.get("timeRangeInput").value.split("~");
    this.orderChildQCForm.get("fromCreateTime").setValue(isNullOrUndefined(fromCreateTime) ? '' : fromCreateTime);
    this.orderChildQCForm.get("toCreateTime").setValue(isNullOrUndefined(toCreateTime) ? '' : toCreateTime);
    this.orderCompleteService.listOrderChild(this.orderChildQCForm.value).catch(error => Observable.throw(error)).subscribe(
      (result) => {
        if (result.code == 0) {
          console.log(result)
          this.orderChildQCForm.get("pageNum").setValue(result.data.pageNum);
          this.orderChildQCForm.get("pageSize").setValue(result.data.pageSize);
          this.totalNum = result.data.total;
          this.totalPages = result.data.pages;
          this.orderChildList = result.data.list;
          this.childload = result.data.list.childNo
        } else {
          this.popResult(null, result);
        }

      },
      error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
    );
  }

  // 当页码改变时调用此函数
  changePageNum(page: Page) {
    console.log(page);
    this.orderChildQCForm.get("pageNum").setValue(page.pageNum);
    this.orderChildQCForm.get("pageSize").setValue(page.pageSize);
    this.listOrderChild();
  }

  // 点搜索按钮时搜索查询子订单
  searchOrderChildList() {
    this.orderChildQCForm.get("pageNum").setValue(1);
    this.listOrderChild();
  }

  completeOrder(childNo:string){
    this.loading = true;
    let response:Observable<Result> = this.orderCompleteService.completeOrder(childNo);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showAlert("操作成功","alert-success");
        this.listOrderChild();
      }else{
        this.showAlert(result.msg,"alert-warning");
      }
    },error =>{
      this.showAlert("网络异常"+error.status,"alert-danger");
    },()=>{
      this.loading = false;
    });

  }

  modifyToStatus(childNo:string){
    this.loading = true;
    let response:Observable<Result> = this.orderCompleteService.modifyToStatus(childNo);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showAlert("操作成功","alert-success");
        this.listOrderChild();
      }else{
        this.showAlert(result.msg,"alert-warning");
      }
    },error =>{
      this.showAlert("网络异常"+error.status,"alert-danger");
    },()=>{
      this.loading = false;
    });

  }
  //修改子单载重
  updatechildTruckLoad(childNo:string){
    this.loading = true;
    let response:Observable<Result> = this.orderCompleteService.updatechildTruckLoad(childNo,$('input[name="Load"]').val());
    response.subscribe(result =>{

      if(result.code == 0){
        this.showAlert("操作成功","alert-success");
        this.listOrderChild();
      }else{
        this.showAlert(result.msg,"alert-warning");
      }
    },error =>{
      this.showAlert("网络异常"+error.status,"alert-danger");
    },()=>{
      this.loading = false;
    });

  }

  // 导航到子订单详情页
  toOrderChildDetail(orderChild: OrderChild) {
    SessionStorage.setObject("orderChildQCForm", this.orderChildQCForm.value);
    this.router.navigate(['/order/orderChild/' + orderChild.childNo,
      {
        orderChild: JSON.stringify(orderChild),
      }]);
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

  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }

}
