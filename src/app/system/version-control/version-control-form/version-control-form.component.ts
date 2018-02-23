import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {VersionControlService} from "../version-control.service";
import {AppComponent} from "../../../app.component";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../common/dto";

@Component({
  selector: 'app-version-control-form',
  templateUrl: './version-control-form.component.html',
  styleUrls: ['./version-control-form.component.css']
})
export class VersionControlFormComponent implements OnInit {

  formModel: FormGroup;
  id:number;
  saveBtn:boolean = false;
  loading:boolean = false;
  title:string;

  constructor(private router:Router,private formBuilder:FormBuilder,private versionControlService:VersionControlService,private routerInfo: ActivatedRoute,public appComponent:AppComponent ) {
    //初始化表单
    this.formModel = formBuilder.group({
      versionContent:['',[Validators.required,Validators.minLength(1),Validators.maxLength(128)]],
      versionName:['',[Validators.required,Validators.minLength(1),Validators.maxLength(32)]],
      versionPath:['',[Validators.required,Validators.minLength(1),Validators.maxLength(128)]],
      versionNumber:['',[Validators.required,Validators.minLength(1),Validators.maxLength(10)]],
      versionForce:['']
    });
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    if(this.id){
      this.title = '修改版本信息';
      this.loading = true;
      this.findById();

    }else{
      this.title = '添加版本信息';
    }
  }

  //取消按钮
  cancel(){
    this.router.navigateByUrl('/system/version-control');
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
  }

  saveNew(){
    console.log(this.formModel.value);
    let response:Observable<any> = this.versionControlService.saveVersionControl(this.formModel.value);
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
    let value={id:this.id};
    Object.assign(value,this.formModel.value);//合并属性
    let response:Observable<Result> = this.versionControlService.updateVersionControl(value);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        this.saveBtn = false;
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

  findById(){
    this.versionControlService.getVersionControlById(this.id).subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        let value ={
          versionContent:ret.data.versionContent,
          versionName:ret.data.versionName,
          versionPath:ret.data.versionPath,
          versionNumber:ret.data.versionNumber,
          versionForce:ret.data.versionForce
        };
        this.formModel.setValue(value);
      }else {
        this.showMsg(ret.msg,"warning");
      }
    },error =>{
      this.showMsg("网络异常"+error.status,"danger");
    });
  }

}
