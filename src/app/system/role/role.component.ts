import {Component, OnDestroy, OnInit} from '@angular/core';
import {RoleService} from "./role.service";
import {AppComponent} from "../../app.component";
import {FormControl, Validators} from "@angular/forms";
import {ComponentEvent, ModalStatus} from "../../common/dto";
import {AppService} from "../../app.service";

declare let $:any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.appService.removeListenEvent("RoleComponent");
  }

  modalTitle:string;
  name:FormControl =  new FormControl();
  id:string;
  dataTable:any;

  menuModelStatus:ModalStatus<string>;
  isRefresh:boolean = false;
  constructor(public roleService:RoleService, public appComponent:AppComponent,public appService:AppService) {

    this.appService.addListenEvent("RoleComponent",(event:ComponentEvent) =>{
      if(event.name =="test"){
        //do something
        //this.test(event.data);
      }
    });
  }

  ngOnInit() {
    this.name.setValidators([Validators.required,Validators.maxLength(16)]);
    $('#roleList').DataTable({
      "processing":true,
      "columns":[
        {"data":"id"},
        {"data":"name"},
        {"data":"creator"},
        {"data":"createTime"},
        {"data":"modifiedTime"},
        {"data":"id"},
      ],
      "columnDefs":[{"targets":5,"render":this.formatActions}],
      "ajax": (data, callback)=> {
        this.roleService.findAll(this.isRefresh).subscribe(ret => {
          if(ret.code == 0){
            callback(ret);
            this.isRefresh = false;
          }else{
            this.appComponent.showAlert(ret.msg,'alert-warning');
          }
        },error =>{
          this.appComponent.showAlert("网络异常"+error.status,"alert-danger");
        });
      }
    });
    //datatable创建的行中按钮暂时无法绑定angular2事件
    $('#roleList').on("click",'tbody a.editFun',this.openUpdate.bind(this));
    $('#roleList').on("click",'tbody a.deleteFun',this.openDelete.bind(this));
    $('#roleList').on("click",'tbody a.menuFun',this.menuFun.bind(this));
  }

  showMsg(msg:string, css:string){
    this.appComponent.showToast(msg);
  }
  formatActions(data){//,type,row
    let str ='<a class="btn btn-warning btn-xs editFun" >修改</a>';
    str +='<a class="btn btn-info btn-xs deleteFun" >删除</a>';
    if(data > 0){
      str +='<a class="btn btn-info btn-xs menuFun" >权限</a>';
    }
    return str;
  }
  create(){
    this.modalTitle = "添加角色";
    this.name.reset();
    this.id = null;
    $("#roleAddModal").modal();

  }

  save(){
    if(this.name.invalid){//表单验证不通过
      if(this.name.untouched){
        this.showMsg("请填写表单信息","warning");
      }
      return;
    }
    this.roleService.save(this.id, this.name.value).subscribe(ret => {
      if(ret.code == 0){
        this.showMsg("操作成功", "success");
        this.isRefresh = true;
        $("#roleList").DataTable().ajax.reload();
        $("#roleAddModal").modal('hide');
      }else{
        this.showMsg(ret.msg, "warning");
      }
    },error => {

      this.showMsg("网络异常"+error.status, "danger");
    });

  }
  openUpdate(e){
    this.modalTitle = "修改角色";
    let _this=e.target;
    let data=$('#roleList').DataTable().row(_this.parentNode.parentNode).data();//得到行的数据
    this.id = data.id;
    this.name.setValue(data.name);
    $("#roleAddModal").modal();
  }
  openDelete(e){
    let _this=e.target;
    let data=$('#roleList').DataTable().row(_this.parentNode.parentNode).data();//得到行的数据
    this.id = data.id;
    $("#roleDeleteModal").modal();

  }
  deleteFun(){
    $("#roleDeleteModal").modal('hide');
    this.roleService.removeById(this.id).subscribe( ret => {
      if(ret.code == 0){
        this.isRefresh = true;
        $("#roleList").DataTable().ajax.reload();
        this.appComponent.showAlert("操作成功",'alert-success');

      }else{
        this.appComponent.showAlert(ret.msg,'alert-warning');
      }
    },error => {
      this.appComponent.showAlert("网络异常"+error.status,"alert-danger");
    });
  }
  menuFun(e){
    let _this=e.target;
    let data=$('#roleList').DataTable().row(_this.parentNode.parentNode).data();//得到行的数据
    this.menuModelStatus = new ModalStatus<string>(true,data.id);
  }
  menuSelect(menuIds:string){

  }

}


