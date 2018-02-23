import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StaffService} from "../staff.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {Md5} from "ts-md5/dist/md5";
import {ModalStatus, Result} from "../../../common/dto";
import {AppComponent} from "app/app.component";
import {Role, RoleService} from "../../role/role.service";
import {Department, DepartmentService} from "../../department/department.service";
import {mobileValidator} from "../../../common/comm-validator";

@Component({
  selector: 'app-staff-form',
  templateUrl: './staff-form.component.html',
  styleUrls: ['./staff-form.component.css'],
  viewProviders:[]
})
export class StaffFormComponent implements OnInit {
  formModel: FormGroup;
  id:number;
  saveBtn:boolean = false;
  loading:boolean = false;
  title:string;
  roleModalStatus:ModalStatus<number>;
  departModelStatus:ModalStatus<number>;
  departmentName:string;
  roleName:string;

  constructor(private router:Router,private formBuilder:FormBuilder,
              private staffService: StaffService,
              private routerInfo: ActivatedRoute,
              public appComponent:AppComponent,
              public roleService:RoleService,
              public departmentService:DepartmentService
  ) {
    //初始化表单
    this.formModel = formBuilder.group({
      name:['',[Validators.required,Validators.maxLength(12)]],
      uname:['',[Validators.required,Validators.minLength(6),Validators.maxLength(16)]],
      pwd:['',[Validators.required,Validators.minLength(6),Validators.maxLength(32)]],
      mobile:['',mobileValidator],
      roleId:[null,Validators.required],
      department:[null,Validators.required],
      email:[null]

    });


  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];

    if(this.id){
      this.title = '修改人员';
      //账号不可以修改
      this.formModel.get('uname').disable();
      this.loading = true;
      this.findById();

    }else{
      this.title = '添加人员';
      let uname:AbstractControl = this.formModel.get('uname');
      //账号是否可用异步验证
      uname.valueChanges.debounceTime(600).subscribe( value =>{
        if(uname.invalid)return;//如果基本校验不通过

        this.staffService.checkUname(value).subscribe(ret =>{
          if(ret.code != 0){
            uname.setErrors(ret);
          }
        });

      });
    }

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
    let response:Observable<any> = this.staffService.saveAdmin(this.formModel.value);
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
    let pwd:AbstractControl = this.formModel.get('pwd');
    if(pwd.dirty){
      //如果密码被修改过则重新加密
      value['pwd'] = Md5.hashStr(pwd.value).toString();
    }
    let response:Observable<Result> = this.staffService.updateAdmin(value);
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
    this.staffService.findById(this.id).subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        let value ={
          name:ret.data.name,
          uname:ret.data.uname,
          pwd:ret.data.pwd,
          mobile:ret.data.mobile,
          roleId:ret.data.roleId,
          department:ret.data.department,
          email:ret.data.email,
        };
        this.renderRole(value.roleId);
        this.renderDepartment(value.department);
        this.formModel.setValue(value);
      }else {
        this.showMsg(ret.msg,"warning");
      }
    },error =>{
      this.showMsg("网络异常"+error.status,"danger");
    });
  }
  openRoleSelect(){
    //this.roleModalStatus.isShow = true;
    //this.roleModalStatus =this.formModel.get("roleId").value;
    this.roleModalStatus = new ModalStatus<number>(true, this.formModel.get("roleId").value);

  }
  openDepartSelect(){

    this.departModelStatus = new ModalStatus<number>(true, this.formModel.get("department").value);

  }
  //<app-role-select (roleChange)="roleSelect($event)"></app-role-select>
  roleSelect(role:Role){
    this.formModel.get("roleId").setValue(role.id);
    this.roleName = role.name;

  }
  departSelect(depart:Department){
    this.formModel.get("department").setValue(depart.id);
    this.departmentName = depart.name;
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

