import {Component, OnInit} from '@angular/core';
import {OrderInfo, OrderInfoService} from "../order-info.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../component/pagination/pagination.component";
import {isNullOrUndefined, isUndefined} from "util";
import {SessionStorage} from "../../../common/session_storage";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../common/dto";
declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-order-info-list',
  templateUrl: './order-info-list.component.html',
  styleUrls: ['./order-info-list.component.css']
})
export class OrderInfoListComponent implements OnInit {
  totalNum: number;
  totalPages: number;

  orderInfoQCForm: FormGroup;

  orderInfoList: Array<OrderInfo>;

  result: Result;

  resultMsgStatus: boolean;
  //弹出的提示信息
  warningMsg: string;

  operation: string;

  orderNo: string;

  /**
   * 跳转到详情页
   * @author wangjianxin
   * @param orderInfo
   */
  toOrderInfoDetail(orderInfo: OrderInfo) {
    SessionStorage.setObject("orderInfoQCForm", this.orderInfoQCForm.value);
    this.router.navigate(['/order/orderInfo/' + orderInfo.orderNo, {
      orderInfo: JSON.stringify(orderInfo)
    }]);

  }

  /**
   * 提示模态框回调函数
   * @param confirmResult
   * @author wangjianxin
   */
  setConfirmResult(confirmResult: boolean) {
    if (confirmResult) {
      //取消货源
      if (this.operation == "cancel") {
        this.cancelOrder(this.orderNo);
      }
    } else {
      this.orderNo = null;
    }
  }

  /**
   * 点击取消按钮
   * @param orderNo
   * @author wangjianixn
   */
  cancelOrderButton(orderNo: string) {
    this.orderNo = orderNo;
    this.operation = "cancel";
    this.warningMsg = "确认要取消货源：" + orderNo + "吗？";
  }

  /**
   * 取消货源
   * @param orderNo
   * @author wangjianxin
   */
  cancelOrder(orderNo: string) {
    this.orderInfoService.cancelOrder(orderNo).catch(error => Observable.throw(error)).subscribe(
      result => this.popResult("取消成功", result),
      error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
    );
  }


  constructor(private orderInfoService: OrderInfoService,
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
      minGoodsSale: [''],
      maxGoodsSale: [''],
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

  /**
   * 选择是否有保险
   * @author wangjianxin
   */
  chooseInsurance() {
    this.orderInfoQCForm.get("insurance").setValue($("#insurance").val());
  }

  /**
   * 选择货源状态
   * @author wangjianxin
   */
  chooseStatus() {
    this.orderInfoQCForm.get("status").setValue($("#status").val());
  }

  /**
   * 查询货源列表
   * @author wangjianxin
   */
  listOrderInfo() {
    const [fromCreateTime, toCreateTime] = this.orderInfoQCForm.get("timeRangeInput").value.split("~");
    this.orderInfoQCForm.get("fromCreateTime").setValue(isNullOrUndefined(fromCreateTime) ? '' : fromCreateTime);
    this.orderInfoQCForm.get("toCreateTime").setValue(isNullOrUndefined(toCreateTime) ? '' : toCreateTime);

    this.orderInfoService.listOrderInfo(this.orderInfoQCForm.value).subscribe((result) => {
      this.orderInfoQCForm.get("pageNum").setValue(result.data.pageNum);
      this.totalNum = result.data.total;
      this.orderInfoQCForm.get("pageSize").setValue(result.data.pageSize);
      this.totalPages = result.data.pages;
      this.orderInfoList = result.data.list;
    });
  }

  /**
   * 页码或者页容量发生改变
   * @param page
   * @author wangjianxin
   */
  changePageNum(page: Page) {
    this.orderInfoQCForm.get("pageNum").setValue(page.pageNum);
    this.orderInfoQCForm.get("pageSize").setValue(page.pageSize);
    this.listOrderInfo();
  }

  /**
   * 点击搜索按钮
   * @author wangjianxin
   */
  searchOrderChildList() {
    //设置页码为第1页
    this.orderInfoQCForm.get("pageNum").setValue(1);
    this.listOrderInfo();
  }

  ngOnInit() {
    let form = SessionStorage.getObject("orderInfoQCForm");
    if (!isUndefined(form.orderNo)) {
      this.orderInfoQCForm.setValue(form);
    }
    this.totalPages = 999999999;
    this.listOrderInfo();
    sessionStorage.removeItem("orderInfoQCForm");
    $('#timeRange').daterangepicker(
      {
        maxDate: moment(), //最大时间
        dateLimit: {
          days: 90
        }, //起止时间的最大间隔
        showDropdowns: true,
        showWeekNumbers: false, //是否显示第几周
        timePicker: true, //是否显示小时和分钟
        timePickerIncrement: 1, //时间的增量，单位为分钟
        timePicker24Hour: true,
        ranges: {
          '最近1小时': [moment().subtract('hours', 1), moment()],
          '今日': [moment().startOf('day'), moment()],
          '昨日': [moment().subtract('days', 1).startOf('day'), moment().subtract('days', 1).endOf('day')],
          '最近7日': [moment().subtract('days', 6), moment()],
          '最近30日': [moment().subtract('days', 29), moment()]
        },
        opens: 'right', //日期选择框的弹出位置
        buttonClasses: ['btn btn-default'],
        applyClass: 'btn-small btn-primary blue',
        cancelClass: 'btn-small',
        format: 'YYYY-MM-DD HH:mm:ss', //控件中from和to 显示的日期格式
        separator: ' to ',
        locale: {
          applyLabel: '确定',
          cancelLabel: '取消',
          fromLabel: '起始时间',
          toLabel: '结束时间',
          customRangeLabel: '自定义',
          daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
          monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
            '七月', '八月', '九月', '十月', '十一月', '十二月'],
          firstDay: 1
        }
      }, (start, end) => {//格式化日期显示框
        const startTime = start.format('YYYY-MM-DD HH:mm:ss');
        const endTime = end.format('YYYY-MM-DD HH:mm:ss');
        this.orderInfoQCForm.get("fromCreateTime").setValue(startTime);
        this.orderInfoQCForm.get("toCreateTime").setValue(endTime);
        this.orderInfoQCForm.get("timeRangeInput").setValue(startTime + "~" + endTime);
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

}
