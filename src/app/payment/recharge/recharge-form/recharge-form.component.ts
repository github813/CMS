import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {intValidator, moneyValidator} from "../../../common/comm-validator";
import {Router} from "@angular/router";
import {ComponentEvent} from "../../../common/dto";
import {AppService} from "../../../app.service";
import {RechargeService} from "../recharge.service";

@Component({
  selector: 'app-recharge-form',
  templateUrl: './recharge-form.component.html',
  styleUrls: ['./recharge-form.component.css']
})
export class RechargeFormComponent implements OnInit {
  formModel: FormGroup;
  loading:boolean = false;
  saveBtn:boolean = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              public appService:AppService,
              public rechargeService:RechargeService
  ) {
    //初始化表单
    this.formModel = formBuilder.group({
      userCode:['',[intValidator]],
      figure:['',[moneyValidator,Validators.min(-900000),Validators.max(1000000)]],
      payNo:['',[Validators.required,Validators.maxLength(32)]],
      remark:['',[Validators.required,Validators.maxLength(64)]]
    });
  }

  ngOnInit() {
  }
  //取消按钮
  cancel(){
    this.router.navigateByUrl('/payment/recharge');
  }
  save(){
    if(this.formModel.invalid){//表单验证不通过
      if(this.formModel.untouched){
        this.showAlert("请填写表单信息","alert-warning");
      }
      return;
    }
    this.saveBtn = true;
    this.rechargeService.save(this.formModel.value).subscribe(result =>{
      if(result.code == 0){
        this.showAlert("操作成功","alert-success");
        //this.router.navigateByUrl("/system/staff");
      }else{
        this.showAlert(result.msg,"alert-warning");
        this.saveBtn = false;
      }
    },error =>{
      this.saveBtn = false;
      this.showAlert("网络异常"+error.status,"alert-danger");
    });

  }
  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }

}
