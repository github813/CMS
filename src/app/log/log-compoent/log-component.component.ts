import {Component, OnInit} from '@angular/core';
import {ClxLog, LogServiceService, StackTraceElement} from "../log-service.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../component/pagination/pagination.component";
declare var $;
declare var moment;
@Component({
  selector: 'app-log-component',
  templateUrl: './log-component.component.html',
  styleUrls: ['./log-component.component.css']
})
export class LogComponentComponent implements OnInit {
  // 总记录数
  totalNum: number;
  // 总记录页数
  totalPages: number;

  //查询表单
  logQCForm: FormGroup;

  //日志list
  logList: Array<ClxLog>;

  //调用栈
  stackTraceElements: Array<StackTraceElement>;

  //显示调用栈
  showStackTrace(stackTrace: Array<StackTraceElement>) {

    this.stackTraceElements = stackTrace;
  }

  //搜索按钮
  searchLog(): void {
    this.logQCForm.get("pageNum").setValue(1);
    this.listLog();
  }

  //查询日志
  listLog(): void {
    const [fromCreateTime, toCreateTime] = this.logQCForm.get("timeRangeInput").value.split("~");
    this.logQCForm.get("fromTime").setValue(fromCreateTime);
    this.logQCForm.get("toTime").setValue(toCreateTime);
    this.logService.listLog(this.logQCForm.value).subscribe((result) => {
        this.totalNum = result.data.total;
        this.totalPages = result.data.pages;
        this.logList = result.data.list;
      }
    );
  }

  //修改页码
  changePageNum(page: Page) {
    this.logQCForm.get("pageNum").setValue(page.pageNum);
    this.logQCForm.get("pageSize").setValue(page.pageSize);
    this.listLog();
  }

  ngOnInit() {
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
        this.logQCForm.get("fromTime").setValue(startTime);
        this.logQCForm.get("toTime").setValue(endTime);
        this.logQCForm.get("timeRangeInput").setValue(startTime + "~" + endTime);
      });

    this.listLog();
  }

  constructor(private logService: LogServiceService, private formBuilder: FormBuilder) {
    this.logQCForm = formBuilder.group({
      level: [''],
      threadName: [''],
      msg: [''],
      exceptionClass: [''],
      fromTime: [''],
      toTime: [''],
      timeRangeInput: [''],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

}
