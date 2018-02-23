import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {MenuService} from "./menu.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {intValidator} from "../../common/comm-validator";
import {Menu} from "../../common/dto";

declare let $:any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  id:string;
  node:any;
  ztree:any;
  setting:{};
  formModel: FormGroup;
  actionMode:string;
  actionModeTitle:string;
  saveBtn:boolean;
  loading:boolean = false;
  constructor(public appComponent:AppComponent,public menuService:MenuService,
              private formBuilder:FormBuilder) {
    this.changeActionMode('view');
    //初始化表单
    this.formModel = formBuilder.group({
      pid:['',[Validators.required]],
      title:['',[Validators.required,Validators.maxLength(16)]],
      type:['',[Validators.required,intValidator]],
      status:['1',[Validators.required,intValidator]],
      link:[null,[Validators.maxLength(128)]],
      showOrder:[100,intValidator],
      cssClass:[null,Validators.maxLength(16)]
    });
    this.formModel.disable();
  }

  ngOnInit() {
    this.setting = {
      //check: {enable: true},
      view: {
        selectedMulti: false
      },
      data: {
        key: {
          name:"title"
        },
        simpleData: {
          enable: true,
          pIdKey: "pid",
        }
      },
      callback:{
        onClick:this.nodeOnclick.bind(this)
      }
    };

    this.menuService.findAll().subscribe(ret =>{
      if(ret.code == 0){
        ret.data.forEach(val => {
          if(val.pid == 1 ||val.pid == 0)val.open = true;
        });
        this.ztree = $.fn.zTree.init($("#menuZTree"), this.setting, ret.data);
        //this.ztree.expandAll(true);
      }else {
        this.appComponent.showAlert(ret.msg,"alert-warning");
      }
    },error => {
      this.appComponent.showAlert("网络异常"+error.status,"alert-danger");
    });
  }
  nodeOnclick(e:Event,treeId:string,node:Menu){
    this.id = node.id.toString();
    this.node = node;
    this.formModel.reset({
      pid:node.pid,
      title:node.title,
      type:node.type,
      status:node.status,
      link:node.link,
      showOrder:node.showOrder,
      cssClass:node.cssClass
    });
    this.formModel.disable();
    this.changeActionMode('view');
  }
  changeActionMode(action:string){
    this.actionMode = action;
    if(action == 'edit'){
      this.actionModeTitle = '修改菜单';
    }
    if(action == 'create'){
      this.actionModeTitle = '新建菜单';
    }
    if(action == 'view'){
      this.actionModeTitle = '菜单详情';
    }
  }
  beginEdit(){
    if(!this.id){
      this.appComponent.showAlert("请先选择节点","alert-warning");
      return;
    }
    this.changeActionMode('edit');
    this.formModel.enable();
    //this.formModel.get('pid').disable();
  }
  beginCreate(){
    if(!this.id){
      this.appComponent.showAlert("请选择父节点","alert-warning");
      return;
    }
    this.changeActionMode('edit');
    //this.node = nodes[0];
    this.formModel.reset({pid:this.id,status:'1',showOrder:100});
    this.formModel.enable();
    //this.formModel.get('pid').disable();
    this.id = null;
  }
  openDelete(){
    if(!this.id){
      this.appComponent.showAlert("请选择要删除的节点","alert-warning");
      return;
    }
    $("#menuDeleteModal").modal();
  }
  deleteNode(){
    $("#menuDeleteModal").modal('hide');
    this.menuService.removeById(this.id).subscribe( ret => {
      if(ret.code == 0){
        this.appComponent.showAlert("操作成功",'alert-success');
        this.ztree.removeNode(this.node);
        this.id = null;
        this.node =null;
        this.formModel.reset();
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
  //取消按钮
  cancel(){
    this.formModel.disable();
    this.changeActionMode('view');

    let node:any = this.node;
    this.formModel.reset({
      pid:node.pid,
      title:node.title,
      type:node.type,
      status:node.status,
      link:node.link,
      showOrder:node.showOrder,
      cssClass:node.cssClass
    });


  }
  //保存按钮
  save(){
    if(this.formModel.invalid){//表单验证不通过
      if(this.formModel.untouched){
        this.appComponent.showAlert("请填写表单信息","alert-warning");
      }
      return;
    }
    this.saveBtn = true;
    this.loading = true;
    let value:any={id:this.id};
    Object.assign(value,this.formModel.value);//合并属性
    this.menuService.save(value).subscribe(result =>{
      if(result.code == 0){
        this.appComponent.showAlert("操作成功","alert-success");
        //this.changeActionMode('view');
        if(value.id){
          //修改完成
          Object.assign(this.node,value);
          //更新节点数据
          this.ztree.updateNode(this.node);
        }else{

          this.id = result.data;
          //组织新节点数据
          let newNode = {isParent:false};
          value.id = result.data;
          Object.assign(newNode,value);
          //添加新节点
          let nodeArr = this.ztree.addNodes(this.node, newNode);
          this.node = nodeArr[0];
          console.log(this.node);
          this.ztree.selectNode(this.node);
        }

      }else{
        this.appComponent.showAlert(result.msg,"alert-warning");
      }
      this.saveBtn = false;
      this.loading = false;
    },error =>{
      this.saveBtn = false;
      this.loading = false;
      this.appComponent.showAlert("网络异常"+error.status,"alert-danger");
    });
  }
}
