import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {MenuService} from "../menu.service";
import {AppComponent} from "../../../app.component";
import {ModalStatus} from "../../../common/dto";
import {RoleService} from "../../role/role.service";

declare let $:any;
@Component({
  selector: 'app-menu-select',
  templateUrl: './menu-select.component.html',
  styleUrls: ['./menu-select.component.css']
})
export class MenuSelectComponent implements OnInit,OnChanges {
  ztree:any;
  setting:{};
  id:string;
  loading:boolean = false;
  saveBtn:boolean = false;
  @Input()
  modalStatus:ModalStatus<string>;
  @Output()
  menuChange:EventEmitter<string> =  new EventEmitter<string>();
  constructor(public appComponent:AppComponent,public menuService:MenuService,public roleService:RoleService) {
    this.setting = {
      check: {enable: true},
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
      }
    };
  }

  ngOnInit() {
    this.menuService.findAll().subscribe(ret =>{
      if(ret.code == 0){
        ret.data.forEach(val => {
          if(val.pid == 1 ||val.pid == 0)val.open = true;
        });
        this.ztree = $.fn.zTree.init($("#menuZTree"), this.setting, ret.data);
      }else {
        this.appComponent.showAlert(ret.msg,"alert-warning");
      }
    },error => {
      this.appComponent.showAlert("网络异常"+error.status,"alert-danger");
    });
    console.log("init");
  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.modalStatus && this.modalStatus.isShow){
      if(this.id != this.modalStatus.data){
        this.id = this.modalStatus.data;
        this.load();
      }
      $("#menuSelectModal").modal();

    }
  }

  load(){
    this.loading = true;
    this.roleService.findMenuIds(this.id).subscribe(ret => {
      if(ret.code == 0){
        let node;
        this.ztree.checkAllNodes(false);
        ret.data.forEach(id =>{
          node = this.ztree.getNodeByParam('id',id,null);
          if(node){
            this.ztree.checkNode(node,true);
          }
        });
      }else {
        this.appComponent.showToast(ret.msg);
      }
      this.loading = false;
    },error => {
      this.appComponent.showToast("网络异常"+error.status);
    });
  }
  selectOK(){

    this.loading = true;
    this.saveBtn = true;
    let nodes = this.ztree.getCheckedNodes();
    let nodeIds = [];
    nodes.forEach(node => {
      nodeIds.push(node.id);
    });
    this.roleService.updateRoleMenu(this.id, nodeIds.join(",")).subscribe(ret =>{
      if(ret.code == 0){
        $("#menuSelectModal").modal('hide');
      }else{
        this.appComponent.showToast(ret.msg);
      }
      this.saveBtn = false;
      this.loading = false;
    },error => {
      this.loading = false;
      this.saveBtn = false;
      this.appComponent.showToast("网络异常"+error.status);
    });
  }

}
