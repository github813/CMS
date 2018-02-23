import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {DictionariesService} from "../dictionaries.service";
import {AppComponent} from "../../../app.component";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../common/dto";

@Component({
  selector: 'app-dictionaries-form',
  templateUrl: './dictionaries-form.component.html',
  styleUrls: ['./dictionaries-form.component.css']
})
export class DictionariesFormComponent implements OnInit {
  formModel: FormGroup;
  id:number;
  saveBtn:boolean = false;
  loading:boolean = false;
  title:string;

  constructor(private router:Router,private formBuilder:FormBuilder,private dictionariesService:DictionariesService,private routerInfo: ActivatedRoute,public appComponent:AppComponent ) {
    //初始化表单
    this.formModel = formBuilder.group({
      key:['',[Validators.required,Validators.minLength(1),Validators.maxLength(32)]],
      value:['',[Validators.required,Validators.minLength(1),Validators.maxLength(32)]],
      content:['',[Validators.required,Validators.minLength(1),Validators.maxLength(128)]]
    });
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    if(this.id){
      this.title = '修改配置';
      this.loading = true;
      this.findById();

    }else{
      this.title = '添加配置';
    }
  }

  //取消按钮
  cancel(){
    this.router.navigateByUrl('/system/dictionaries');
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
    let response:Observable<any> = this.dictionariesService.saveSystemDictionaries(this.formModel.value);
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
    let response:Observable<Result> = this.dictionariesService.updateSystemDictionaries(this.id,this.formModel.get("value").value);
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

  findById(){
    this.dictionariesService.getSystemDictionariesById(this.id).subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        let value ={
          key:ret.data.key,
          value:ret.data.value,
          content:ret.data.content
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
