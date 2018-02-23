import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Role, RoleService} from "../role.service";
import {AppComponent} from "../../../app.component";
import {ModalStatus} from "../../../common/dto";
import {FormControl} from "@angular/forms";


declare let $:any;
@Component({
  selector: 'app-role-select',
  templateUrl: './role-select.component.html',
  styleUrls: ['./role-select.component.css']
})
export class RoleSelectComponent implements OnInit,OnChanges{
  roleAll:Role[];
  roleList:Role[];
  id:number;
  role:Role;
  nameFilter: FormControl = new FormControl();
  @Input()
  modalStatus:ModalStatus<number>;

  @Output()
  roleChange:EventEmitter<Role> =  new EventEmitter<Role>();
  constructor(public roleService:RoleService, public appComponent:AppComponent) { }

  ngOnInit() {

  }
  rowClick(role:Role){
    this.id = role.id;
    this.role = role;

  }
  open(){
    $("#roleSelectModal").modal();
    if(this.roleList){
      return;
    }
    this.roleService.findAll().subscribe(ret => {
      if(ret.code == 0){
        this.roleList = ret.data;
        this.roleAll = ret.data;

      }else{
        this.appComponent.showToast(ret.msg);
      }
    },error => {
      this.appComponent.showToast("网络异常:"+error.status);
    });

  }

  ngOnChanges(changes: SimpleChanges): void {
    if(this.modalStatus && this.modalStatus.isShow){
      this.id = this.modalStatus.data;
      this.open();
    }
  }
  selectOK(){
    if(!this.role){
      this.appComponent.showToast("请选择角色");
      return;
    }
    if(this.role.id == 0){
      this.appComponent.showToast("不能选择"+this.role.name);
      return;
    }
    this.roleChange.emit(this.role);
    $("#roleSelectModal").modal('hide');
  }
  find(){
    if(!this.roleAll){
      return;
    }
    let search = this.nameFilter.value;
    this.roleList = this.roleAll.filter((role:Role) => {
      return role.name.indexOf(search) >= 0;
    });

  }

}
