import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Api} from "../../../common/api";
import {Http} from "@angular/http";
import {Ajax} from "../../../common/ajax";
import {AppService} from "../../../app.service";
import {ComponentEvent} from "../../../common/dto";

declare function saveAs(blog, name);
declare var $: any;
declare var moment: any;

@Component({
  selector: 'app-order-child-statistics',
  templateUrl: './order-child-statistics.component.html',
  styleUrls: ['./order-child-statistics.component.css']
})
export class OrderChildStatisticsComponent implements OnInit {
  url: string = Api.STATISTICS;
  orderChildQCForm: FormGroup;
  public times=30;
  public iscansubmit=false;
  constructor(private http: Http, private ajax: Ajax,private appsevice: AppService, formBuilder: FormBuilder) {
    this.orderChildQCForm = formBuilder.group({
      ownerId: [''],
      orderNo: ['', [Validators.minLength(17), Validators.maxLength(17)]],
      orderType: ['1'],
      startTime: [''],
      endTime: [''],
      timeRangeEnd:[''],
      timeRangeStart:['']
    });
  }

  ngOnInit() {
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
    $('#timeRangeStart').daterangepicker(timelist,
      function(starttime) {
        const startTime = starttime.format('YYYY-MM-DD HH:mm:ss');
        self.orderChildQCForm.get("startTime").setValue(startTime);
        self.orderChildQCForm.get("timeRangeStart").setValue(startTime);
      }) ;
    $('#timeRangeEnd').daterangepicker(timelist,
      function(endtime) {
        const endTime = endtime.format('YYYY-MM-DD'+" 23:59:59");
        self.orderChildQCForm.get("endTime").setValue(endTime);
        self.orderChildQCForm.get("timeRangeEnd").setValue(endTime);
      })
  }

  downLoad() {

    let self=this;
    if($(".form-group").hasClass("has-error")||$(".input-group").hasClass("has-error") ){
      return;
    } else {
      self.showToast("隔30秒后单击");
      var link = document.createElement("a");
      this.ajax.getBlob(Api.STATISTICS, this.orderChildQCForm.value).subscribe(data => {
        link.setAttribute("href", window.URL.createObjectURL(data));
        link.setAttribute("download", "报表" + Date.now() + ".xlsx");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      var t1 = setInterval(function () {
        if(self.times>0){
          self.times--;
          self.iscansubmit=true;
        }else{
          clearInterval(t1);
          self.iscansubmit=false;
          self.times=30;
        }
      },1000);
    }


  }
  showToast(msg:string){
    this.appsevice.sendEvent(new ComponentEvent(this,"AppComponent","showToast",msg));
  }
}
