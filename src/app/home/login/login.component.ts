import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AppService} from "../../app.service";
import {SessionStorage} from "../../common/session_storage";
import {Md5} from "ts-md5/dist/md5";
import {ComponentEvent} from "../../common/dto";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  formModel: FormGroup;
  loginBtn:boolean = false;
  constructor(private formBuilder:FormBuilder, public appsevice:AppService) {
    this.formModel = formBuilder.group({
      "uname":['',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      "pwd":['',[Validators.required,Validators.minLength(6),Validators.maxLength(32)]],
    });
  }

  ngOnInit() {
  }
  login(){
    if(this.formModel.invalid){//表单验证不通过
      if(this.formModel.untouched){
        this.showToast("请填写表单信息");
      }
      return;
    }
    this.loginBtn = true;
    let value = {
      uname:this.formModel.value.uname,
      pwd:this.formModel.value.pwd
    }
    value.pwd = Md5.hashStr(value.pwd).toString();
    this.appsevice.login(value).subscribe(result =>{
      if(result.code == 0){
        SessionStorage.setUser(result.data);
        this.appsevice.sendEvent(new ComponentEvent(this,"AppComponent","loginMsg"));
      }else{
        this.showToast(result.msg);
      }
      this.loginBtn = false;
    },error =>{
      this.loginBtn = false;
      this.showToast("网络异常"+error.status);
    });
  }
  showToast(msg:string){
    this.appsevice.sendEvent(new ComponentEvent(this,"AppComponent","showToast",msg));
  }

}
