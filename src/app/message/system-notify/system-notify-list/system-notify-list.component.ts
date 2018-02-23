import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup} from "@angular/forms";
import {MessageService, SystemMessage} from "../../message.service";
import {Page} from "../../../component/pagination/pagination.component";
import {Route, Router} from "@angular/router";
import {Result} from "../../../common/dto";
import {el} from "@angular/platform-browser/testing/src/browser_util";
declare var $;
declare var moment;
@Component({
  selector: 'app-system-notify-list',
  templateUrl: './system-notify-list.component.html',
  styleUrls: ['./system-notify-list.component.css']
})
export class SystemNotifyListComponent implements OnInit {
  // pageNum: number;
  // pageSize: number;
  totalNum: number;
  totalPages: number;

  systemNotifyQCForm: FormGroup;
  systemMessageList: Array<SystemMessage>;

  // 弹出框的提示信息
  warningMsg: String;
  // 请求结果
  result: Result;
  // 是否显示结果弹出框
  resultMsgStatus: boolean;

  changePageNum(page: Page) {
    this.systemNotifyQCForm.get("pageNum").setValue(page.pageNum);
    this.systemNotifyQCForm.get("pageSize").setValue(page.pageSize);
    this.listSystemMessage();
  }


  constructor(formBuilder: FormBuilder, private messageService: MessageService, private router: Router) {
    this.systemNotifyQCForm = formBuilder.group({
      id: [''],
      receiver: [''],
      receiverRole: [''],
      title: [''],
      content: [''],
      orderNo: [''],
      //系统通知类型为-1
      type: ['-1'],
      fromCreateTime: [''],
      toCreateTime: [''],
      timeRangeInput: [''],
      pageNum: ['1'],
      pageSize: ['10']
    })
  }

  chooseReceiverRole() {
    this.systemNotifyQCForm.get("receiverRole").setValue($("#receiverRole").val());
  }

  listSystemMessage() {
    this.messageService.listSystemMessageList(this.systemNotifyQCForm.value).subscribe((result) => {
        if (result.code == 0) {
          this.systemMessageList = result.data.list;
          this.systemNotifyQCForm.get("pageNum").setValue(result.data.pageNum);
          this.totalNum = result.data.total;
          this.systemNotifyQCForm.get("pageSize").setValue(result.data.pageSize);
          this.totalPages = result.data.pages;
        } else {
          this.popResult(null, result);
        }
      }
    );
  }

  toSystemMessageForm(systemMessage: SystemMessage) {
    this.router.navigate(['/message/systemNotify/form/' + systemMessage.id, {systemMessage: JSON.stringify(systemMessage)}]);

  }

  ngOnInit() {
    this.listSystemMessage();
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
        timePicker12Hour: false, //是否使用12小时制来显示时间
        ranges: {
          //'最近1小时': [moment().subtract('hours',1), moment()],
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
        this.systemNotifyQCForm.get("fromCreateTime").setValue(startTime);
        this.systemNotifyQCForm.get("toCreateTime").setValue(endTime);
        this.systemNotifyQCForm.get("timeRangeInput").setValue(startTime + "~" + endTime);
      });
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
