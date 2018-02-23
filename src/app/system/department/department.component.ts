import { Component, OnInit } from '@angular/core';
import '../../../../node_modules/ztree/js/jquery.ztree.all.js'
import {AppComponent} from "../../app.component";
import {FormControl} from "@angular/forms";
import {DepartmentService} from "./department.service";

declare let $:any;

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css']
})
export class DepartmentComponent implements OnInit {
  ztree:any;
  modalTitle:string;
  id:string;
  pid:string;
  setting:{};
  node:{};
  name:FormControl =  new FormControl();
  constructor(public appComponent:AppComponent,public departmentService:DepartmentService) { }

  ngOnInit() {
    this.setting = {
      //check: {enable: true},
      view: {
        selectedMulti: false
      },
      data: {
        simpleData: {
          enable: true,
          pIdKey: "pid",
        }
      }
    };

    this.departmentService.findAll().subscribe(ret =>{
      if(ret.code == 0){
        this.ztree = $.fn.zTree.init($("#departmentZTree"), this.setting, ret.data);
        this.ztree.expandAll(true);
      }else {
        this.appComponent.showAlert(ret.msg,"alert-warning");
      }
    },error => {
      this.appComponent.showAlert("网络异常"+error.status,"alert-danger");
    });

  }
  showMsg(msg:string){
    this.appComponent.showToast(msg);
  }


  save(){
    if(this.name.invalid){//表单验证不通过
      if(this.name.untouched){
        this.showMsg("请填写表单信息");
      }
      return;
    }
    this.departmentService.save(this.id, this.name.value,this.pid).subscribe(ret => {
      if(ret.code == 0){
        this.showMsg("操作成功");
        $("#departmentAddModal").modal('hide');
        if(this.id){
          this.node['name'] = this.name.value;
          this.ztree.updateNode(this.node);
        }else{
          let newNode = {id:ret.data, pid:this.id,isParent:false, name:this.name.value};
          this.ztree.addNodes(this.node, newNode);
        }

      }else{
        this.showMsg(ret.msg);
      }
    },error => {

      this.showMsg("网络异常"+error.status);
    });

  }
  openCreate(type:number){
    if(type == 0){//创建根节点
      this.pid = '0';
      this.node = null;
    }else{
      let nodes:Array<any> = this.ztree.getSelectedNodes();
      if(nodes.length == 0){
        this.appComponent.showAlert("请选择父节点","alert-warning");
        return;
      }
      this.pid = nodes[0].id;
      this.node = nodes[0];
    }

    this.modalTitle = "添加部门";
    this.name.reset();
    this.id = null;
    $("#departmentAddModal").modal();

  }
  openUpdate(){
    let nodes:Array<any> = this.ztree.getSelectedNodes();
    if(nodes.length == 0){
      this.appComponent.showAlert("请选择节点","alert-warning");
      return;
    }
    this.modalTitle = "修改部门";
    this.node = nodes[0];
    this.name.setValue(nodes[0].name);
    this.pid = null;
    this.id = nodes[0].id;
    $("#departmentAddModal").modal();
  }
  openDelete(){
    let nodes:Array<any> = this.ztree.getSelectedNodes();
    if(nodes.length == 0){
      this.appComponent.showAlert("请选择要删除的节点","alert-warning");
      return;
    }
    $("#departmentDeleteModal").modal();
    this.id = nodes[0].id;
    this.node =nodes[0];
  }
  deleteNode(){
    $("#departmentDeleteModal").modal('hide');
    this.departmentService.removeById(this.id).subscribe( ret => {
      if(ret.code == 0){
        this.appComponent.showAlert("操作成功",'alert-success');
        this.ztree.removeNode(this.node);
      }else{
        this.appComponent.showAlert(ret.msg,'alert-warning');
      }
    },error => {
      this.appComponent.showAlert("网络异常"+error.status,"alert-danger");
    });
  }
  cancelSelected(){
    this.ztree.cancelSelectedNode();
  }

}
