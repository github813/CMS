import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppService} from "../../../app.service";
import {SettlementService} from "../settlement.service";
import {ComponentEvent} from "../../../common/dto";
import {intValidator} from "../../../common/comm-validator";

@Component({
  selector: 'app-settlement-form',
  templateUrl: './settlement-form.component.html',
  styleUrls: ['./settlement-form.component.css']
})
export class SettlementFormComponent implements OnInit {
  formModel: FormGroup;
  loading:boolean = false;
  saveBtn:boolean = false;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              public appService:AppService,
              public settlementService:SettlementService
  ) {
    //初始化表单
    this.formModel = formBuilder.group({
      amount:['',[intValidator,Validators.min(1),Validators.max(10000000)]],
      cardId:['1',[Validators.required]],
      remark:['',[Validators.maxLength(50)]]
    });
  }

  ngOnInit() {
  }
  save(){
    if(this.formModel.invalid){//表单验证不通过
      if(this.formModel.untouched){
        this.showAlert("请填写表单信息","alert-warning");
      }
      return;
    }
    this.saveBtn = true;
    this.settlementService.save(this.formModel.value).subscribe(result =>{
      if(result.code == 0){
        this.showAlert("操作成功","alert-success");
      }else{
        this.showAlert(result.msg,"alert-warning");
        this.saveBtn = false;
      }
    },error =>{
      this.saveBtn = false;
      this.showAlert("网络异常"+error.status,"alert-danger");
    });

  }
  //取消按钮
  cancel(){
    this.router.navigateByUrl('/payment/settlement');
  }
  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }

}
