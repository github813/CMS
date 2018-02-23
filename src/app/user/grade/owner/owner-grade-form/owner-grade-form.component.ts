import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {AppComponent} from "../../../../app.component";
import {OwnerService} from "../owner.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../../common/dto";
import {intValidator} from "../../../../common/comm-validator";
declare var $;
@Component({
  selector: 'app-owner-grade-form',
  templateUrl: './owner-grade-form.component.html',
  styleUrls: ['./owner-grade-form.component.css']
})
export class OwnerGradeFormComponent implements OnInit {

  formModel: FormGroup;
  id:number;
  saveBtn:boolean = false;
  loading:boolean = false;
  title:string;

  constructor(private router:Router,private formBuilder:FormBuilder,private ownerService:OwnerService,
              private routerInfo: ActivatedRoute,public appComponent:AppComponent ) {
    //初始化表单
    this.formModel = formBuilder.group({
      id:[""],
      creatorId:[''],
      gradeNo:[''],
      gradeName:['',[Validators.required,Validators.minLength(1),Validators.maxLength(5)]],
      gradeExp:['',[Validators.required,intValidator, Validators.minLength(1),Validators.maxLength(7)]],
      informationRate:['',[Validators.required,Validators.min(0),Validators.max(1),Validators.pattern("([0-9]\\d*(\\.\\d*[1-9])?)|(0\\.\\d*[1-9])" )]],
      insuranceRate :['',[Validators.required,Validators.min(0),Validators.max(1),Validators.pattern("([0-9]\\d*(\\.\\d*[1-9])?)|(0\\.\\d*[1-9])" )]],
      integralRate:['',[Validators.required,Validators.min(0),Validators.max(1),Validators.pattern("([0-9]\\d*(\\.\\d*[1-9])?)|(0\\.\\d*[1-9])" )]],
      industryInfo:['0',[Validators.required]],
      superService:['0',[Validators.required]]
    });
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    this.formModel.patchValue({creatorId:JSON.parse(sessionStorage['user'])['userId']});
    if(this.id){
      this.title = '修改货主等级权益';
      this.loading = true;
      this.findById();

    }else{
      this.title = '添加货主等级权益';
    }
  }

//取消按钮
  cancel(){
    this.router.navigateByUrl('/user/grade/owner');
  }

  //保存按钮
  save(){
    if(this.formModel.invalid){//表单验证不通过
      this.showMsg("请填写表单信息","warning");
    }else{
      this.saveBtn = true;
      if(this.id){
        this.saveUpdate();
      }else{
        this.saveNew();
      }
    }

  }

  saveNew(){
    let response:Observable<any> = this.ownerService.saveOwnerGrade(this.formModel.value);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        this.router.navigateByUrl("/user/grade/owner");
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
    let response:Observable<Result> = this.ownerService.updateOwnerGrade(this.formModel.value);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        this.router.navigateByUrl("/user/grade/owner");
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
    this.ownerService.getOwnerGradeById(this.id).subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        let value ={
          id:ret.data.id,
          creatorId:ret.data.creatorId,
          gradeNo:ret.data.gradeNo,
          gradeName:ret.data.gradeName,
          gradeExp:ret.data.gradeExp,
          informationRate:ret.data.informationRate,
          integralRate:ret.data.integralRate,
          superService:ret.data.superService,
          insuranceRate :ret.data.insuranceRate,
          industryInfo:ret.data.industryInfo
        };
        this.formModel.setValue(value);
        setTimeout(function () {
          $("input[name='industryInfo']").eq(ret.data.industryInfo).attr('checked','checked');
          $("input[name='superService']").eq(ret.data.superService).attr('checked','checked');
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
    // debugger;
     if(type==1){
       this.formModel.get("superService").setValue(value);
     }else if (type==2){
       this.formModel.get("industryInfo").setValue(value);
     }
  }
}
