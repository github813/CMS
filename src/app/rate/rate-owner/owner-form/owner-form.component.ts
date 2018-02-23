import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {RateOwnerService} from "../rate-owner.service";
import {AppComponent} from "../../../app.component";
import {Observable} from "rxjs/Observable";
import {Result} from "app/common/dto";
@Component({
  selector: 'app-owner-form',
  templateUrl: './owner-form.component.html',
  styleUrls: ['./owner-form.component.css']
})
export class OwnerFormComponent implements OnInit {
  formModel: FormGroup;
  id:number;
  saveBtn:boolean = false;
  loading:boolean = false;
  title:string;
  constructor(private router:Router,private formBuilder:FormBuilder,private rateOwnerService:RateOwnerService,private routerInfo: ActivatedRoute,public appComponent:AppComponent ) {
    //初始化表单
    this.formModel = formBuilder.group({
      userId:['',[Validators.required,Validators.minLength(1),Validators.maxLength(8)]],
      star:['',[Validators.required,Validators.minLength(1),Validators.maxLength(8)]],
      rate:['',[Validators.required,Validators.minLength(1),Validators.maxLength(8)]]
    });
  }
  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    this.formModel.patchValue({userId:JSON.parse(sessionStorage['user'])['userId']});
    if(this.id){
      this.title = '修改配置';
      this.loading = true;
      this.findById();

    }else{
      this.title = '添加配置';
    }
  }
  findById(){
    this.rateOwnerService.getRateOwnerById(this.id).subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        let value ={
          userId:ret.data.userId,
          star:ret.data.star,
          rate:ret.data.rate
        };
        this.formModel.setValue(value);
      }else {
        this.showMsg(ret.msg,"warning");
      }
    },error =>{
      this.showMsg("网络异常"+error.status,"danger");
    });
  }

  //取消按钮
  cancel(){
    this.router.navigateByUrl('/user/rate/rate-owner');
  }

  //保存按钮
  save(){
    if(this.formModel.invalid){//表单验证不通过
      if(this.formModel.untouched){
        this.showMsg("请填写表单信息","warning");
      }
      return;
    }
    this.saveBtn = true;
    if(this.id){
      //修改
      // Object.assign(target);
      this.saveUpdate();
    }else{
      //新创建
      this.saveNew();
    }
    this.router.navigateByUrl('/user/rate/rate-owner');
  }

  saveNew(){
    // this.formModel.get("userId").setValue("userId");
    let response:Observable<any> = this.rateOwnerService.saveRateOwner(this.formModel.value);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        //this.router.navigateByUrl("/system/staff");
      }else{
        this.showMsg(result.msg,"warning");
        this.saveBtn = false;
      }
    },error =>{
      this.saveBtn = false;
      this.showMsg("网络异常"+error.status,"danger");
    });
  }

  saveUpdate(){
    let response:Observable<Result> = this.rateOwnerService.updateRateOwner(this.id,this.formModel.get("rate").value);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        //this.router.navigateByUrl("/system/staff");
      }else{
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
}
