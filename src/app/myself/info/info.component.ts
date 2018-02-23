import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AppComponent} from "../../app.component";
import {RoleService} from "../../system/role/role.service";
import {DepartmentService} from "../../system/department/department.service";
import {mobileValidator} from "../../common/comm-validator";
import {Observable} from "rxjs/Observable";
import {Md5} from "ts-md5/dist/md5";
import {ComponentEvent, Result} from "../../common/dto";
import {InfoService} from "./info.service";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {
  formModel: FormGroup;
  id:number;
  saveBtn:boolean = false;
  loading:boolean = false;
  departmentName:string;
  roleName:string;

  constructor(private router:Router,private formBuilder:FormBuilder,
              private infoService:InfoService,
              public appService:AppService,
              public roleService:RoleService,
              public departmentService:DepartmentService
  ) {
    //初始化表单
    this.formModel = formBuilder.group({
      name:['',[Validators.required,Validators.maxLength(12)]],
      uname:[''],
      pwd:['',[Validators.required,Validators.minLength(6),Validators.maxLength(32)]],
      mobile:['',mobileValidator],
      email:[null]
    });

  }

  ngOnInit() {
    //账号不可以修改
    this.formModel.get('uname').disable();
    this.loading = true;
    this.infoService.myself().subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        let value ={
          name:ret.data.name,
          uname:ret.data.uname,
          pwd:ret.data.pwd,
          mobile:ret.data.mobile,
          email:ret.data.email,
        };
        this.renderRole(ret.data.roleId);
        this.renderDepartment(ret.data.department);
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
    this.router.navigateByUrl('/system/staff');
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
    //修改
    // Object.assign(target);
    this.saveUpdate();

  }

  saveUpdate(){
    let value={id:this.id};
    Object.assign(value,this.formModel.value);//合并属性
    let pwd:AbstractControl = this.formModel.get('pwd');
    if(pwd.dirty){
      //如果密码被修改过则重新加密
      value['pwd'] = Md5.hashStr(pwd.value).toString();
    }
    let response:Observable<Result> = this.infoService.updateMyself(value);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        //this.router.navigateByUrl("/system/staff");
      }else{
        this.showMsg(result.msg,"warning");
      }
      this.saveBtn = false;
    },error =>{
      this.saveBtn = false;
      this.showMsg("网络异常"+error.status,"danger");
    });
  }

  //显示提示信息
  showMsg(msg:string, css:string){
    css = "alert-"+css;
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }

  renderRole(id){
    if(this.roleService.allRoles){
      let allRoles = this.roleService.allRoles;
      let role = allRoles.find(role =>{
        return role.id == id;
      });
      if(role) this.roleName = role.name;
      return;
    }
    this.roleService.findAll().subscribe(ret => {
      if(ret.code == 0){
        this.renderRole(id);
      }
    });
  }
  renderDepartment(id){
    if(this.departmentService.allDepartments){
      let allDepart = this.departmentService.allDepartments;
      let depart = allDepart.find(depart => {
        return depart.id == id;
      });
      if(depart) this.departmentName = depart.name;
      return;
    }
    this.departmentService.findAll().subscribe(ret => {
      if(ret.code == 0){
        this.renderDepartment(id);
      }
    });
  }

}
