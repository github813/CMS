import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MessageService, SystemMessage} from "../../message.service";
import {Result} from "../../../common/dto";
import {Page} from "../../../component/pagination/pagination.component";
import {Router} from "@angular/router";
declare var $;
declare var moment;
@Component({
  selector: 'app-business-notify-list',
  templateUrl: './business-notify-list.component.html',
  styleUrls: ['./business-notify-list.component.css']
})
export class BusinessNotifyListComponent implements OnInit {
  // pageNum: number;
  // pageSize: number;
  totalNum: number;
  totalPages: number;

  businessNotifyQCForm: FormGroup;
  systemMessageList: Array<SystemMessage>;

  // 弹出框的提示信息
  warningMsg: String;
  // 请求结果
  result: Result;
  // 是否显示结果弹出框
  resultMsgStatus: boolean;

  changePageNum(page: Page) {
    this.businessNotifyQCForm.get("pageNum").setValue(page.pageNum);
    this.businessNotifyQCForm.get("pageSize").setValue(page.pageSize);
    console.log(page);
    this.listSystemMessage();
  }


  constructor(formBuilder: FormBuilder, private messageService: MessageService, private router: Router) {
    this.businessNotifyQCForm = formBuilder.group({
      id: [''],
      receiver: [''],
      receiverRole: [''],
      title: [''],
      content: [''],
      orderNo: [''],
      //业务通知类型为0
      type: ['0'],
      fromCreateTime: [''],
      toCreateTime: [''],
      timeRangeInput: [''],
      pageNum: ['1'],
      pageSize: ['10']
    })
  }

  chooseReceiverRole() {
    this.businessNotifyQCForm.get("receiverRole").setValue($("#receiverRole").val());
  }

  listSystemMessage() {
    this.messageService.listSystemMessageList(this.businessNotifyQCForm.value).subscribe((result) => {
        if (result.code == 0) {
          this.systemMessageList = result.data.list;
          this.businessNotifyQCForm.get("pageNum").setValue(result.data.pageNum);
          this.totalNum = result.data.total;
          this.businessNotifyQCForm.get("pageSize").setValue(result.data.pageSize);
          this.totalPages = result.data.pages;
        } else {
          this.popResult(null, result);
        }
      }
    );
  }


  ngOnInit() {
    this.listSystemMessage();
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
        format: 'YYYY-MM-DD',
        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月'],
        firstDay: 1
      }
    };
    $('#fromCreateTime').daterangepicker(timelist,
      function(starttime) {
        const startTime = starttime.format('YYYY-MM-DD'+" 00:00:00");
        self.businessNotifyQCForm.get("fromCreateTime").setValue(startTime);
      }) ;
    $('#toCreateTime').daterangepicker(timelist,
      function(endtime) {
        const endTime = endtime.format('YYYY-MM-DD'+" 23:59:59");
        self.businessNotifyQCForm.get("toCreateTime").setValue(endTime);
      })
  }

  popResult(successMsg: string, result: Result) {
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
