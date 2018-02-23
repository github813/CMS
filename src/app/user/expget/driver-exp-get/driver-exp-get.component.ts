import {AppComponent} from '../../../app.component';
import { Component, OnInit } from '@angular/core';
import { ExpGetService } from '../expget.service';
import { Router } from '@angular/router';
import { error } from 'selenium-webdriver';

@Component({
  selector: 'app-driver-exp-get',
  templateUrl: './driver-exp-get.component.html',
  styleUrls: ['./driver-exp-get.component.css']
})
export class DriverExpGetComponent implements OnInit {
  public data;
  constructor(
    public appComponent: AppComponent,
    public service: ExpGetService,
    public router: Router
  ) { }

  ngOnInit() {
     this.list();
  }
  //列表
  list() {
    this.service.driverExpList()
      .subscribe(data => {
        if (data.code == 0) {
          this.data = data.data;
        } else {
          alert(data.msg)
        }
      });
  }
  //年月日解析
  read(time) {
    if (time == "F") {
      return "永久"
    }
    if (time == "Y") {
      return "一年"
    }
    if (time == "M") {
      return "一个月"
    }
    if (time == "D") {
      return "一天"
    }
    if (time==null) {
      return "无限制"
    }
  }
  //显示提示信息
  showMsg(msg: string, css: string) {
    this.appComponent.showAlert(msg, "alert-" + css);
  }
  addExp(type) {
    this.router.navigateByUrl('user/expget/expAdd?type='+type);
  }
  driverDelete(expCode) {
    this.service.driverExpDelete(expCode)
      .subscribe( arg =>{
      if(arg.code==0){
        this.showMsg("操作成功", "success");
        this.list();
      } else {
        this.showMsg(arg.msg, "warning");
      }
      }, error => {
        this.showMsg("网络异常" + error.status, "danger");
   })
 } 
}