import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Page} from "../../../component/pagination/pagination.component";
import {OrderChild, OrderChildLog, OrderChildService, OrderChildStatus} from "../order-child-service";
import {ActivatedRoute,  Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../common/dto";
import {SessionStorage} from "../../../common/session_storage";
import {isNullOrUndefined, isUndefined} from "util";
declare var $: any;
declare var moment: any;
@Component({
  selector: 'app-order-child',
  templateUrl: './order-child-list.component.html',
  styleUrls: ['./order-child-list.component.css'],
  providers: [OrderChildService]
})

export class OrderChildListComponent implements OnInit {
  // 总记录数
  totalNum: number;
  // 总记录页数
  totalPages: number;

  // 查询表单
  orderChildQCForm: FormGroup;

  // 子订单查询结果
  orderChildList: Array<OrderChild>;

  // 子订单的状态列表
  orderChildStatusList: Array<OrderChildStatus> = OrderChildService.orderChildStatusList;

  // 传递给result模态框的结果
  result: Result;
  // 控制result模态框的显示
  resultMsgStatus: boolean;
  // 子订单日志列表
  orderChildLogList: Array<OrderChildLog>;

  // 导航到子订单详情页
  toOrderChildDetail(orderChild: OrderChild) {
    SessionStorage.setObject("orderChildQCForm", this.orderChildQCForm.value);
    this.router.navigate(['/order/orderChild/' + orderChild.childNo,
      {
        orderChild: JSON.stringify(orderChild),
      }]);
  }

  //子订单操作日志
  listOrderChildLog(childNo: string) {
    this.orderChildService.listOrderChildLog(childNo).catch(error => Observable.throw(error)).subscribe(
      result => {
        if (result.code == 0) {
          this.orderChildLogList = result.data;
        } else {
          this.popResult(null, result);
        }
      },
      error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
    );
  }

  //导航到订单轨迹
  toOrderTrace(childNo: number) {
    SessionStorage.setObject("orderChildQCForm", this.orderChildQCForm.value);
    this.router.navigate(['/order/orderChild/orderTrace/' + childNo]);
  }


  constructor(private orderChildService: OrderChildService, formBuilder: FormBuilder, private router: Router, private routeInfo: ActivatedRoute) {
    this.orderChildQCForm = formBuilder.group({
      orderNo: ['', [Validators.minLength(17), Validators.maxLength(17)]],
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
    // const [fromCreateTime, toCreateTime] = this.orderChildQCForm.get("timeRangeInput").value.split("~");
    // this.orderChildQCForm.get("fromCreateTime").setValue(isNullOrUndefined(fromCreateTime) ? '' : fromCreateTime);
    // this.orderChildQCForm.get("toCreateTime").setValue(isNullOrUndefined(toCreateTime) ? '' : toCreateTime);
    this.orderChildService.listOrderChild(this.orderChildQCForm.value).catch(error => Observable.throw(error)).subscribe(
      (result) => {
        if (result.code == 0) {
          this.orderChildQCForm.get("pageNum").setValue(result.data.pageNum);
          this.orderChildQCForm.get("pageSize").setValue(result.data.pageSize);
          this.totalNum = result.data.total;
          this.totalPages = result.data.pages;
          this.orderChildList = result.data.list;
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

  ngOnInit() {
    let form: any = SessionStorage.getObject("orderChildQCForm");
    if (!isUndefined(form.childNo)) {
      this.orderChildQCForm.setValue(form);
    }
    this.totalPages = 999999999;
    this.listOrderChild();
    SessionStorage.remove("orderChildQCForm");
    let self = this;
    let timelist={
      singleDatePicker: true,
      maxDate: moment(), //最大时间
      showDropdowns: true,
      showWeekNumbers: false, //是否显示第几周
      timePickerIncrement: 1, //时间的增量，单位为分钟
      opens: 'right', //日期选择框的弹出位置
      buttonClasses: ['btn btn-default'],
      applyClass: 'btn-small btn-primary blue',
      cancelClass: 'btn-small',
      format: 'yyyy-MM-dd hh:mm:ss', //控件中from和to 显示的日期格式

      separator: ' to ',
      locale: {
        format: 'YYYY-MM-DD ',
        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月'],
        firstDay: 1
      }
    };
    $('#fromCreateTime').daterangepicker(timelist,
      function(starttime) {
        const startTime = starttime.format('YYYY-MM-DD'+" 00:00:00");
        self.orderChildQCForm.get("fromCreateTime").setValue(startTime);
      }) ;
    $('#toCreateTime').daterangepicker(timelist,
      function(endtime) {
        const endTime = endtime.format('YYYY-MM-DD'+" 23:59:59");
        self.orderChildQCForm.get("toCreateTime").setValue(endTime);
      })
  }

}
