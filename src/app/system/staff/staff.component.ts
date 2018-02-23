import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {Admin, StaffService} from "./staff.service";
import {Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {ComponentEvent, ModalStatus, Result} from "../../common/dto";
import {AppComponent} from "../../app.component";
import {Role, RoleService} from "../role/role.service";
import {Department, DepartmentService} from "../department/department.service";
import {AppService} from "../../app.service";

declare let $:any;
@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {
  pageSize:number = 10;
  page:{} ={totalNum:1,pageSize:this.pageSize};
  currentPage:number = 1;
  adminList: Admin[];
  nameFilter: FormControl = new FormControl();
  roleFilter: FormControl = new FormControl();
  departFilter: FormControl = new FormControl();
  id:number;
  roleId:number;
  departId:number;
  loading:boolean = true;

  roleModalStatus:ModalStatus<number>;
  departModelStatus:ModalStatus<number>;
  constructor(public router:Router,
              public staffService:StaffService,
              public appService:AppService,
              public roleService:RoleService,
              public departmentService:DepartmentService
  ) {}

  ngOnInit() {
    this.findPage();
  }
  pageChange(page:number){
    if(this.currentPage != page){
      this.currentPage = page;
      this.findPage();
    }
  }
  findPage(){
    this.loading = true;
    let observable:Observable<any>;
    if(!this.departFilter.value){
      this.departId = null;
    }
    if(!this.roleFilter.value){
      this.roleId = null;
    }
    if(!this.nameFilter.value && this.roleId == null && this.departId == null){
      observable = this.staffService.findAll(this.currentPage)
    }else{
      observable = this.staffService.findList(this.currentPage,
        this.nameFilter.value, this.roleId, this.departId);
    }
    observable.subscribe(ret =>{
      if(ret.code == 0){
        this.adminList = ret.data.list;
        this.page = {totalNum:ret.data.total,pageSize:this.pageSize};
        this.renderRole();
        this.renderDepartment();
      }else {
        this.showAlert(ret.msg,"alert-warning");
      }
      this.loading = false;
    },error =>{
      this.showAlert("网络异常"+error.status,"alert-danger");
      this.loading = false;
    });
  }
  update(id:number){
    this.router.navigateByUrl("/system/staff/form/"+id);
  }
  create(){
    this.router.navigateByUrl("/system/staff/form/new");
  }

  //delete(id:number){}
  openDelete(id:number){
    this.id = id;
    $("#modal-warning").modal();
  }
  deleteFun(){
    $('#modal-warning').modal('hide');
    this.loading = true;

    let response:Observable<Result> = this.staffService.updateStatus(this.id.toString(),'0');
    response.subscribe(result =>{
      if(result.code == 0){
        this.showAlert("操作成功","alert-success");
        this.findPage();
      }else{
        this.showAlert(result.msg,"alert-warning");
      }
    },error =>{
      this.showAlert("网络异常"+error.status,"alert-danger");
    },()=>{
      this.loading = false;
    });

  }
  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }
  renderRole(){
    if(this.roleService.allRoles){
      let allRoles = this.roleService.allRoles;
      this.adminList.forEach(admin =>{
        let role = allRoles.find(role =>{
          return role.id.toString() == admin.roleId;
        });
        if(role) admin.roleId =role.name;
      });
      return;
    }
    this.roleService.findAll().subscribe(ret => {
        if(ret.code == 0){
          this.renderRole();
        }
    });
  }
  renderDepartment(){
    if(this.departmentService.allDepartments){
      let allDepart = this.departmentService.allDepartments;
      this.adminList.forEach(admin => {
        let depart = allDepart.find(depart => {
          return depart.id.toString() == admin.department;
        });
        if(depart) admin.department = depart.name;
      });
      return;
    }
    this.departmentService.findAll().subscribe(ret => {
      if(ret.code == 0){
        this.renderDepartment();
      }
    });
  }
  openRoleSelect(){
    this.roleModalStatus = new ModalStatus<number>(true, this.roleFilter.value);
  }
  openDepartSelect(){
    this.departModelStatus = new ModalStatus<number>(true, this.departFilter.value);
  }
  roleSelect(role:Role){
    this.roleFilter.setValue(role.name);
    this.roleId = role.id;
  }
  departSelect(depart:Department){
    this.departFilter.setValue(depart.name);
    this.departId= depart.id;
  }
}
