import {AppComponent} from '../../../app.component';
import { Component, OnInit } from '@angular/core';
import { ExpGetService } from '../expget.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-owner-exp-get',
  templateUrl: './owner-exp-get.component.html',
  styleUrls: ['./owner-exp-get.component.css']
})
export class OwnerExpGetComponent implements OnInit {
  public data;
  constructor(
    public appComponent:AppComponent,
    public service: ExpGetService,
    public router: Router
  ) { }

  ngOnInit() {
   this.list();
  }
  list() {
    this.service.ownerExpList()
      .subscribe(arg => {
        if (arg.code == 0) {
          this.data = arg.data;
        } else {
          alert(arg.msg);
        }
      });
  }
  //年月日解析
  read(time){
    if (time=="F"){
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
    if (time == null) {
      return "无限制"
    }
  }
  //显示提示信息
  showMsg(msg: string, css: string) {
    this.appComponent.showAlert(msg, "alert-" + css);
  }
  addExp(type) {
    this.router.navigateByUrl('user/expget/expAdd?type=' + type);
  }
  ownerDelete(expCode) {
    this.service.ownerExpDelete(expCode)
      .subscribe(arg => {
        if (arg.code == 0) {
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
