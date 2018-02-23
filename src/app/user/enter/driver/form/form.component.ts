import { Component, OnInit } from '@angular/core';
import {DriverAuthInfo, DriverService} from "../driver.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  driverAuthInfo: DriverAuthInfo;

  formModel: FormGroup;

  constructor(private routeInfo: ActivatedRoute,
              private router: Router,
              private driverService: DriverService) {
  }

  ngOnInit() {
    let action = this.routeInfo.snapshot.params['action'];
    if (action == 'update') {
      this.driverAuthInfo = this.driverService.getDriverAuthInfo();
      let status = '';
      let content = '';
      if (this.driverAuthInfo) {
        content = this.driverAuthInfo.content;

        if (this.driverAuthInfo.status == 1 || this.driverAuthInfo.status == 2) {
          status = this.driverAuthInfo.status.toString();
        }
      }
      this.formModel = new FormGroup({
        content:new FormControl(content),
        statusResult:new FormControl(status)
      });
    } else {
      alert("数据有误，请从列表页面跳转。");
      this.router.navigateByUrl('/user/enter/owner');
    }
  }

  authUpdate(){
    let content = this.formModel.get('content').value;
    let userId = this.driverAuthInfo.userId;
    let recordId = this.driverAuthInfo.id;
    let statusResult = this.formModel.get('statusResult').value;
    if(statusResult == '1' && content== ""){
      alert("请填写审核失败原因");
      return;
    }
    this.driverService.authUpdate(recordId,userId,statusResult,content," ").subscribe(ret =>{
      if(ret.code ==0){
        this.router.navigateByUrl('/user/enter/driver');
      }else{
        alert(ret.msg);
        //this.router.navigateByUrl('/user/enter/driver');
      }
    });
  }
  // 强制通过
  coercionThrough() {
    let content = this.formModel.get('content').value;
    let userId = this.driverAuthInfo.userId;
    let recordId = this.driverAuthInfo.id;
    let statusResult = this.formModel.get('statusResult').value;
    if (statusResult == '1' && content == "") {
      alert("请填写审核失败原因");
      return;
    }
    this.driverService.authUpdate(recordId, userId, statusResult, content,"1").subscribe(ret => {
      if (ret.code == 0) {
        confirm("确定强制审核吗？")
        this.router.navigateByUrl('/user/enter/driver');
      } else {
        alert(ret.msg);
        //this.router.navigateByUrl('/user/enter/driver');
      }
    });
  }
  //取消按钮
  cancel(){
    this.router.navigateByUrl('/user/enter/driver');
  }

}
