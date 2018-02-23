import {Component, OnInit} from '@angular/core';
import {OwnerAuthInfo, OwnerService} from "../owner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {
  ownerAuthInfo: OwnerAuthInfo;

  formModel: FormGroup;

  constructor(private routeInfo: ActivatedRoute,
              private router: Router,
              private ownerService: OwnerService) {
  }

  ngOnInit() {
    let action = this.routeInfo.snapshot.params['action'];
    if (action == 'update') {
      this.ownerAuthInfo = this.ownerService.getOwnerAuthInfo();
      let status = '';
      let content = '';
      if (this.ownerAuthInfo) {
        content = this.ownerAuthInfo.content;

        if (this.ownerAuthInfo.status == 1 || this.ownerAuthInfo.status == 2) {
          status = this.ownerAuthInfo.status.toString();
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

  authUpdate1(id:number,userId:number,statusResult:number,content:string){
    this.ownerService.authUpdate(id,userId,statusResult,content).subscribe(ret =>{
      if(ret.code ==0){
        alert("success");
      }else{
        alert(ret.msg);
      }
    });
  }

  authUpdate(){
    let content = this.formModel.get('content').value;
    let userId = this.ownerAuthInfo.userId;
    let recordId = this.ownerAuthInfo.id;
    let statusResult = this.formModel.get('statusResult').value;
    if(statusResult == '1' && content== ""){
      alert("请填写审核失败原因");
      return;
    }
    this.ownerService.authUpdate(recordId,userId,statusResult,content).subscribe(ret =>{
      if(ret.code ==0){
        alert("success");
        this.router.navigateByUrl('/user/enter/owner');
      }else{
        alert(ret.msg);
        //this.router.navigateByUrl('/user/enter/owner');
      }
    });
  }
  //取消按钮
  cancel(){
    this.router.navigateByUrl('/user/enter/owner');
  }

}
