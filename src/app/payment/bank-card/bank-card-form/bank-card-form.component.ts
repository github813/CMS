import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../../app.service";
import {BankCardService} from "../bank-card.service";
import {idCardValidator, mobileValidator} from "../../../common/comm-validator";
import {ComponentEvent} from "../../../common/dto";
import {Dictionary} from "../../../common/dictionary";
declare let _:any;

@Component({
  selector: 'app-bank-card-form',
  templateUrl: './bank-card-form.component.html',
  styleUrls: ['./bank-card-form.component.css']
})
export class BankCardFormComponent implements OnInit {
  formModel: FormGroup;
  loading:boolean = false;
  saveBtn:boolean = false;
  bankList:any ;
  constructor(private router:Router,
              private formBuilder:FormBuilder,
              public appService:AppService,
              public service:BankCardService) {
    //初始化表单
    this.formModel = formBuilder.group({
      name:['',[Validators.required,Validators.maxLength(10)]],
      cardNo:['',[Validators.required,Validators.maxLength(32)]],
      bankCode:['',Validators.required],
      mobile:['',mobileValidator],
      idNo:['',[Validators.required,idCardValidator]]
    });
    this.bankList = _.pairs(Dictionary.bankCode);
  }

  ngOnInit() {
  }

  //取消按钮
  cancel(){
    this.router.navigateByUrl('/payment/bankCard');
  }
  save(){
    if(this.formModel.invalid){//表单验证不通过
      if(this.formModel.untouched){
        this.showAlert("请填写表单信息","alert-warning");
      }
      return;
    }
    this.saveBtn = true;
    this.service.save(this.formModel.value).subscribe(result =>{
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
