import { Component, OnInit } from '@angular/core';
import {TruckAuthInfo, TruckAuthService} from "../truck-auth.service";
import {FormControl, FormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-truck-auth-form',
  templateUrl: './truck-auth-form.component.html',
  styleUrls: ['./truck-auth-form.component.css']
})
export class TruckAuthFormComponent implements OnInit {

  public id:number;

  truckAuthInfo:TruckAuthInfo;

  formModel: FormGroup;

  constructor(private routeInfo: ActivatedRoute,
              private router: Router,
              private truckAuthService: TruckAuthService) {
  }

  findByTruckId(){
    this.truckAuthService.findByTruckId(this.id).subscribe(ret =>{
      if(ret.code == 0){
        this.truckAuthInfo = ret.data;
        console.log(ret.data);
      }else {
        alert("信息有误");
      }
    },error =>{
      //this.showMsg("网络异常"+error.status,"danger");
    });
  }

  ngOnInit() {
    this.id = this.routeInfo.snapshot.params['id'];
    if (this.id) {
      this.findByTruckId();
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
    let userId = this.truckAuthInfo.userId;
    let recordId = this.truckAuthInfo.id;
    let statusResult = this.formModel.get('statusResult').value;
    let truckLoad = this.truckAuthInfo.load;
    if(truckLoad>200&&statusResult==2){
      alert("车辆载重过大，请联系司机重新添加。");
      return;
    }
    if(statusResult == '1' && content== ""){
      alert("请填写审核失败原因");
      return;
    }
    this.truckAuthService.authUpdate(recordId,userId,statusResult,content).subscribe(ret =>{
      if(ret.code ==0){
        alert("success");
        this.router.navigateByUrl('/user/enter/truck-auth');
      }else{
        alert(ret.msg);
        //this.router.navigateByUrl('/user/enter/truck-auth');
      }
    });
  }
  //取消按钮
  cancel(){
    this.router.navigateByUrl('/user/enter/truck-auth');
  }

}
