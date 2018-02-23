import {Component, OnInit} from '@angular/core';
import {Banner, BannerAction, BannerService} from "../banner.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Result} from "../../../../common/dto";
import {Observable} from "rxjs/Observable";
import {RequestOptions} from "@angular/http";
declare var $: any;
declare var moment: any;
@Component({
  selector: 'app-driver-banner',
  templateUrl: './driver-banner.component.html',
  styleUrls: ['./driver-banner.component.css']
})
export class DriverBannerComponent implements OnInit {

  bannerList: Array<Banner>;
  domain: string;
  bannerForm: FormGroup;
  // 弹出框的提示信息
  warningMsg: String;
  // 请求结果
  result: Result;
  // 是否显示结果弹出框
  resultMsgStatus: boolean;

  //banner: Banner;

  actionList: Array<BannerAction> = BannerService.actionList;

  operation: string;

  bannerId: number;

  update(banner: Banner) {

  }

  constructor(private bannerService: BannerService, formBuilder: FormBuilder) {
    this.bannerForm = formBuilder.group({
      id: [''],
      type: ['driver'],
      orderNum: [''],
      image: [''],
      action: [''],
      url: [''],
      startTime: [''],
      endTime: [''],
      customField: [''],
      modifiedTime: ['']
    });
  }

  showForm(operation: string) {
    this.operation = operation;
    this.bannerForm.reset({type: 'driver'});
  }

  updateBanner(banner: Banner) {
    this.operation = 'update';
    this.bannerForm.get("id").setValue(banner.id);
    this.bannerForm.get("orderNum").setValue(banner.orderNum);
    this.bannerForm.get("image").setValue(banner.image);
    this.bannerForm.get("action").setValue(banner.action);
    this.bannerForm.get("url").setValue(banner.url);
    this.bannerForm.get("customField").setValue(banner.customField);
    this.bannerForm.get("startTime").setValue(banner.startTime);
    this.bannerForm.get("endTime").setValue(banner.endTime);
    this.bannerForm.get("modifiedTime").setValue(banner.modifiedTime);
  }

  deleteBanner(banner: Banner) {
    this.bannerId = banner.id;
    this.operation = "delete";
    this.warningMsg = "确定要删除第" + banner.orderNum + "个banner吗？";

  }

  setConfirmResult(confirmResult: boolean) {
    if (confirmResult) {
      if (this.operation == "update") {
        this.bannerService.updateBanner(this.bannerForm.value).catch(error => Observable.throw(error)).subscribe(
          (result) => {
            this.popResult("修改成功", result);
            this.bannerForm.get("id").setValue(null)
          },
          error => {
            this.popResult(null, {code: -1, msg: '系统错误', data: 'null'});
          }
        );
      }

      if (this.operation == "create") {
        this.bannerService.saveBanner(this.bannerForm.value).catch(error => Observable.throw(error)).subscribe(
          result => {
            this.popResult("保存成功", result);
          },
          error => {
            this.popResult(null, {code: -1, msg: '系统错误', data: 'null'});
          }
        )
      }
      if (this.operation == "delete") {
        this.bannerService.deleteBanner(this.bannerId).catch(error => Observable.throw(error)).subscribe(
          result => {
          this.popResult("删除成功", result);
        },
          error => {
            this.popResult(null, {code: -1, msg: '系统错误', data: 'null'});
          }
        )
      }
    }
    this.warningMsg = null;
  }

  ngOnInit() {
    this.operation == null;
    this.bannerService.listBanner('driver').catch(error => Observable.throw(error)).subscribe(
      result => {
        this.bannerList = result.data.bannerList;
        this.domain = result.data.domain;
      },
      error => this.popInitResult(null, {code: -1, msg: '系统错误', data: 'null'})
    );
    let self = this;
    let timelist = {
      timePicker: true,
      singleDatePicker: true,
      // maxDate: moment(), //最大时间
      showDropdowns: true,
      showWeekNumbers: false, //是否显示第几周
      timePickerIncrement: 1, //时间的增量，单位为分钟
      opens: 'right', //日期选择框的弹出位置
      buttonClasses: ['btn btn-default'],
      applyClass: 'btn-small btn-primary blue',
      cancelClass: 'btn-small',
      format: 'yyyy-MM-dd HH:mm:ss', //控件中from和to 显示的日期格式

      separator: ' to ',
      locale: {
        format: 'YYYY-MM-DD HH:mm:ss',
        daysOfWeek: ['日', '一', '二', '三', '四', '五', '六'],
        monthNames: ['一月', '二月', '三月', '四月', '五月', '六月',
          '七月', '八月', '九月', '十月', '十一月', '十二月'],
        firstDay: 1
      }
    };
    // $("#startTime").datetimepicker({format: 'yyyy-mm-dd hh:ii'});
    $('#startTime').daterangepicker(timelist,
      function (starttime) {
        const startTime = starttime.format('YYYY-MM-DD HH:mm:ss');
        self.bannerForm.get("startTime").setValue(startTime);
      });
    $('#endTime').daterangepicker(timelist,
      function (endtime) {
        const endTime = endtime.format('YYYY-MM-DD HH:mm:ss');
        self.bannerForm.get("endTime").setValue(endTime);
      })
  }

  submit() {
    if (this.operation == 'update') {
      this.warningMsg = "确定要修改第" + this.bannerForm.get('orderNum').value + "个banner吗？";

    }
    if (this.operation == "create") {
      this.warningMsg = "确定要新增一个Banner吗？";
    }
  }

  uploadFile(event) {
    let fileList: FileList = event.target.files;
    this.bannerService.uploadFile(fileList, 'banner').catch(error => Observable.throw(error)).subscribe(
      (result) => {
        if (result.code == 0) {
          this.bannerForm.get("image").setValue(result.data.pathList[0]);
        } else {
          this.popResult("null", result);
        }

      },
      error => {
        this.popResult(null, {code: -1, msg: '系统错误', data: 'null'});
      }
    )
  }

  popResult(successMsg: string, result: Result) {
    if (result.code == 0) {
      result.msg = successMsg;
    }
    this.result = result;
    this.resultMsgStatus = true;
    setTimeout(() => {
      this.resultMsgStatus = false;
      this.ngOnInit();
    }, 2000);
  }

  popInitResult(successMsg: string, result: Result) {
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
