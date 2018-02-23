import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../../../../app.component";
import {ExpService,DriverInfo} from "../../exp.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../../../common/dto";
import {SessionStorage} from "../../../../../common/session_storage";

@Component({
  selector: 'app-driversaveexp',
  templateUrl: './saveexplog.component.html'
})
export class SaveexplogComponent implements OnInit {

  formModel: FormGroup;
  id:number;
  type:string;
  usertype:string;
  saveBtn:boolean = false;
  title:string;
  userInfo:DriverInfo;
  constructor(private router:Router,private formBuilder:FormBuilder,private expService:ExpService,
              private routerInfo: ActivatedRoute,public appComponent:AppComponent ) {
    //初始化表单
    this.formModel = formBuilder.group({
      expCode:['other',[Validators.required]],
      expValue:['',[Validators.required,Validators.min(1),Validators.max(10000000)]],
      remark:['',[Validators.required]],
      userId:[''],
      userType:['driver']
     });
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    this.type = this.routerInfo.snapshot.params['type'];
    this.usertype= this.routerInfo.snapshot.params['usertype'];
    this.userInfo=SessionStorage.getObject("userinfo");
    this.formModel.get("userId").setValue(this.id);
    this.formModel.get("userType").setValue(this.usertype);
    if(this.type=="add"){
      this.title = '添加V值';
    }else{
      this.title = '减扣V值';
    }
  }

//取消按钮
  cancel(){
    this.router.navigateByUrl('/user/user/exp/'+this.usertype+"exp");
  }

  //保存按钮
  save(){
    if(this.formModel.invalid){//表单验证不通过
      this.showMsg("请填写表单信息","warning");
      return;
    }else{
      this.saveBtn=true;
      this.saveNew();
    }
  }

  saveNew(){
    var self=this;
    let response:Observable<any>;
    if(this.type=="sub"){
      this.formModel.controls['expValue'].clearValidators();
      this.formModel.get("expValue").setValue("-"+this.formModel.get("expValue").value)
    }
    if(this.usertype=="driver"){
      response = this.expService.savedriverExpLog(this.formModel.value);
    }else{
      response = this.expService.saveownerExpLog(this.formModel.value);
    }
    response.subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        setTimeout(function () {
          self.router.navigateByUrl('/user/user/exp/'+self.usertype+"exp");
        },1000)

      }else{
        this.formModel.controls['expValue'].setValidators([Validators.required,Validators.min(1),Validators.max(10000000)])
        this.showMsg(result.msg,"warning");
        this.saveBtn = false;
      }
    },error =>{
      this.saveBtn = false;
      this.showMsg("网络异常"+error.status,"danger");
    });
  }


  //显示提示信息
  showMsg(msg:string, css:string){
    this.appComponent.showAlert(msg,"alert-"+css);
  }

  findById(){
    // this.driverService.getDriverGradeById(this.id).subscribe(ret =>{
    //   this.loading = false;
    //   if(ret.code == 0){
    //     let value ={
    //       gradeNo:ret.data.gradeNo,
    //       gradeName:ret.data.gradeName,
    //       gradeExp:ret.data.gradeExp,
    //       informationRate:ret.data.informationRate
    //     };
    //     this.formModel.setValue(value);
    //   }else {
    //     this.showMsg(ret.msg,"warning");
    //   }
    // },error =>{
    //   this.showMsg("网络异常"+error.status,"danger");
    // });
  }

}
