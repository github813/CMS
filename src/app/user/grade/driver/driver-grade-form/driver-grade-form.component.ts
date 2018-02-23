import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../../../app.component";
import {DriverService} from "../driver.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../../common/dto";
declare var $;
@Component({
  selector: 'app-driver-grade-form',
  templateUrl: './driver-grade-form.component.html',
  styleUrls: ['./driver-grade-form.component.css']
})
export class DriverGradeFormComponent implements OnInit {

  formModel: FormGroup;
  id:number;
  creatorId;
  saveBtn:boolean = false;
  loading:boolean = false;
  title:string;

  constructor(private router:Router,private formBuilder:FormBuilder,private driverService:DriverService,
              private routerInfo: ActivatedRoute,public appComponent:AppComponent ) {
    //初始化表单
    this.formModel = formBuilder.group({
      id:[""],
      creatorId:['',[Validators.required,Validators.minLength(1),Validators.maxLength(2)]],
      // gradeNo:['',[Validators.required,Validators.minLength(1),Validators.maxLength(2)]],
      gradeName:['',[Validators.required,Validators.minLength(1),Validators.maxLength(4)]],
      gradeExp:['',[Validators.required,Validators.minLength(1),Validators.maxLength(7)]],
      integralRate:['',[Validators.required,Validators.min(0),Validators.max(1),Validators.pattern("([0-9]\\d*(\\.\\d*[1-9])?)|(0\\.\\d*[1-9])" )]],
      mallRate:['',[Validators.required,Validators.min(0),Validators.max(1),Validators.pattern("([0-9]\\d*(\\.\\d*[1-9])?)|(0\\.\\d*[1-9])" )]],
      pushPriority:['0',[Validators.required]],
      superService:['0',[Validators.required]],
      creditCeiling:['',[Validators.min(100),Validators.max(800000)]],
      informationRate:['',[Validators.required,Validators.min(0),Validators.max(1),Validators.pattern("([0-9]\\d*(\\.\\d*[1-9])?)|(0\\.\\d*[1-9])" )]]
    });
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    this.formModel.patchValue({creatorId:JSON.parse(sessionStorage['user'])['userId']});
    if(this.id){
      this.title = '修改司机等级权益';
      this.loading = true;
      this.findById();

    }else{
      this.title = '添加司机等级权益';
    }
  }

//取消按钮
  cancel(){
    this.router.navigateByUrl('/user/grade/driver');
  }

  //保存按钮
  save(){
    if(this.formModel.invalid){//表单验证不通过
        this.showMsg("请填写表单信息","warning");
    }else {
      this.saveBtn = true;
      if (this.id) {
        //修改
        // Object.assign(target);
        this.saveUpdate();
      } else {
        //新创建
        this.saveNew();
      }
    }
  }

  saveNew(){
    let response:Observable<any> = this.driverService.saveDriverGrade(this.formModel.value);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        this.router.navigateByUrl("/user/grade/driver");
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
    let response:Observable<Result> = this.driverService.updateDriverGrade(this.formModel.value);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        this.router.navigateByUrl("/user/grade/driver");
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
    this.driverService.getDriverGradeById(this.id).subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        let value ={
          id:ret.data.id,
          creatorId:JSON.parse(sessionStorage['user'])['userId'],
          // gradeNo:ret.data.gradeNo,
          gradeName:ret.data.gradeName,
          gradeExp:ret.data.gradeExp,
          informationRate:ret.data.informationRate,
          mallRate:ret.data.mallRate,
          pushPriority:ret.data.pushPriority,
          integralRate:ret.data.integralRate,
          superService:ret.data.superService,
          creditCeiling:ret.data.creditCeiling
        };
        this.formModel.setValue(value);
        setTimeout(function () {
          $("input[name='superService']").eq(ret.data.superService).attr('checked','checked');
          // $("input[name='mallRate']").eq(ret.data.mallRate).attr('checked','checked');
          $("input[name='pushPriority']").eq(ret.data.pushPriority).attr('checked','checked');
        },100)
        console.log(value)
      }else {
        this.showMsg(ret.msg,"warning");
      }
    },error =>{
      this.showMsg("网络异常"+error.status,"danger");
    });
  }
  checkradio(value:number,type:number){
    if(type==1){
      this.formModel.get("superService").setValue(value);
    }else if (type==2){
      this.formModel.get("pushPriority").setValue(value);
    }
  }
}
