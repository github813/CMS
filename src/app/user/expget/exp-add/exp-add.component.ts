import {ExpGetService} from '../expget.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { Md5 } from "ts-md5/dist/md5";
import { ModalStatus, Result } from "../../../common/dto";
import { AppComponent } from "app/app.component";
import { mobileValidator } from "../../../common/comm-validator";
import { Api } from '../../../common/api';


@Component({
   selector: 'app-exp-add',
   templateUrl: './exp-add.component.html',
   styleUrls: ['./exp-add.component.css']
})
export class ExpAddComponent implements OnInit {
  formModel: FormGroup;
  id: number;
  saveBtn: boolean = false;
  loading: boolean = false;
  title: string;
  roleModalStatus: ModalStatus<number>;
  departModelStatus: ModalStatus<number>;
  departmentName: string;
  roleName: string;
  public driverExpConfig = Api.driverExpConfig;
  public ownerExpConfig = Api.ownerExpConfig;
  public cvalue="none";//none.block
  public fvalue="none";

  constructor(
    private router: Router, 
    private fb: FormBuilder,
    private routerInfo: ActivatedRoute,
    public appComponent: AppComponent,
    public service: ExpGetService
  )
     {
    this.formModel = fb.group({
      expCode: ['', [Validators.required, Validators.maxLength(12)]],
      expName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(8)]],
      hasLimit: ['', Validators.required],
      expLimitType: [''],
      performTimes: ['',Validators.required],//次数
      expLimitValue: [''],//最多可获得的V值
      isFixedValue: ['', Validators.required],
      expValue: [''],
      description: ['']
    });
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.queryParams['type'];
    if (this.id == 1) {
        this.title = '添加司机成长值获取规则';
      } else if (this.id == 2) {
        this.title = '添加货主成长值获取规则';
      }
  }
  //取消按钮
  cancel() {
    if(this.id==1){
      this.router.navigateByUrl('/user/expget/driverExpGet');
    }else if(this.id=2){
      this.router.navigateByUrl('/user/expget/ownerExpGet');
    }
  }
  //显示提示信息
  showMsg(msg: string, css: string) {
    this.appComponent.showAlert(msg, "alert-" + css);
  }
  //保存按钮
  save() {
    console.log(this.formModel.value)
    if (this.formModel.invalid) {//表单验证
      if (this.formModel.untouched) {
        this.showMsg("请填写表单信息", "warning");
      }
      return;
    }
    if (this.id==1) {    //司机
      this.saveInfo(this.driverExpConfig, "driverExpGet");
    } else if(this.id==2){ //货主
      this.saveInfo(this.ownerExpConfig,"ownerExpGet");
    }
  }
  saveInfo(name,address) {
    this.service.expConfig(name,this.formModel.value) 
      .subscribe(result => {
         if (result.code == 0) {
          this.showMsg("操作成功", "success");
          this.router.navigateByUrl(`/user/expget/${address}`);
         } else {
          this.showMsg(result.msg, "warning");
          this.saveBtn = false;
         }
       }, error => {
          this.saveBtn = false;
          this.showMsg("网络异常" + error.status, "danger");
     });
  }
  limitNo() {
    this.cvalue = "none";
    this.formModel.value.expLimitType='';
  }
  limitYes() {
    this.cvalue = "block";
  }
  fixedNo() {
    this.fvalue = "none";
    this.formModel.value.expValue='';
  }
  fixedYes() {
    this.fvalue = "block";
  }
}


