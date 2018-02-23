import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {Department, DepartmentService} from "../department.service";
import {AppComponent} from "../../../app.component";
import {ModalStatus} from "../../../common/dto";
import '../../../../../node_modules/ztree/js/jquery.ztree.all.js'

declare let $:any;
@Component({
  selector: 'app-depart-select',
  templateUrl: './depart-select.component.html',
  styleUrls: ['./depart-select.component.css']
})
export class DepartSelectComponent implements OnInit,OnChanges {

  ztree:any;
  setting:{};
  list:{}[];
  @Input()
  modalStatus:ModalStatus<number>;
  @Output()
  departChange:EventEmitter<Department> =  new EventEmitter<Department>();
  constructor(public appComponent:AppComponent,public departmentService:DepartmentService) { }

  ngOnInit() {
    this.setting = {
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

  }
  open(){
    $("#departSelectModal").modal();
    if(this.list){
      return;
    }
    this.departmentService.findAll().subscribe(ret =>{
      if(ret.code == 0){
        this.list = ret.data;
        this.ztree = $.fn.zTree.init($("#departmentZTree"), this.setting, ret.data);
        this.ztree.expandAll(true);
      }else {
        this.appComponent.showAlert(ret.msg,"alert-warning");
      }
    },error => {
      this.appComponent.showAlert("网络异常"+error.status,"alert-danger");
    });

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.modalStatus && this.modalStatus.isShow){
      //this.id = this.modalStatus.data;
      this.open();
    }
  }
  selectOK(){
    let nodes:Array<any> = this.ztree.getSelectedNodes();
    if(nodes.length == 0){
      this.appComponent.showToast("请选择点");
      return;
    }
    let department = new Department(nodes[0].id,nodes[0].pid,nodes[0].name,nodes[0].creator);
    this.departChange.emit(department);
    $("#departSelectModal").modal('hide');
  }

}
