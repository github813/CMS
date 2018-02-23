import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {LicenceAuthInfo, LicenceAuthService} from "../../licence-auth.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-licence-auth-form',
  templateUrl: './licence-auth-form.component.html',
  styleUrls: ['./licence-auth-form.component.css']
})
export class LicenceAuthFormComponent implements OnInit {

  licenceAuthInfo:LicenceAuthInfo;

  formModel: FormGroup;

  constructor(private routeInfo: ActivatedRoute,
              private router: Router,
              private licenceAuthService: LicenceAuthService) {
  }

  ngOnInit() {
    let action = this.routeInfo.snapshot.params['action'];
    if (action == 'update') {
      this.licenceAuthInfo = this.licenceAuthService.getLicenceAuthInfo();
      this.formModel = new FormGroup({
        content:new FormControl(),
        statusResult:new FormControl()
      });
    } else {
      alert("数据有误，请从列表页面跳转。");
      this.router.navigateByUrl('/user/enter/owner');
    }
  }

  authUpdate(){
    let content = this.formModel.get('content').value;
    let userId = this.licenceAuthInfo.userId
    let recordId = this.licenceAuthInfo.id;
    let statusResult = this.formModel.get('statusResult').value;
    if(statusResult == '1' && content== ""){
      alert("请填写审核失败原因");
      return;
    }
    this.licenceAuthService.authUpdate(recordId,userId,statusResult,content).subscribe(ret =>{
      if(ret.code ==0){
        alert("success");
        this.router.navigateByUrl('/user/enter/licence-auth');
      }else{
        alert(ret.msg);
        //this.router.navigateByUrl('/user/enter/licence-auth');
      }
    });
  }
  //取消按钮
  cancel(){
    this.router.navigateByUrl('/user/enter/licence-auth');
  }

}
