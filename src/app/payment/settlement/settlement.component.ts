import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import {SettlementService, WithdrawApplication} from "./settlement.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {ComponentEvent} from "../../common/dto";

@Component({
  selector: 'app-settlement',
  templateUrl: './settlement.component.html',
  styleUrls: ['./settlement.component.css']
})
export class SettlementComponent implements OnInit {

  pageSize:number = 10;
  page:{} ={totalNum: 1, pageSize: this.pageSize};
  currentPage:number = 1;
  loading:boolean = true;
  dataList:WithdrawApplication[];
  statusFilter: FormControl = new FormControl('');
  listType: string = 'auditList';
  constructor(public router:Router,
              public appService:AppService,
              public settlementService:SettlementService) {

  }

  ngOnInit() {
    let param = this.settlementService.settlementParam;
    if(param){
      this.currentPage = param['currentPage'];
      this.listType = param['listType']?param['listType']:'auditList';
      if(param['status']){
        this.statusFilter.setValue(param['status']);
      }
    }
    this.findPage(false);
  }
  findPage(isReset:boolean){
    this.loading = true;
    if(isReset){
      this.currentPage = 1;
    }
    let p ={pageNum: this.currentPage, pageSize: this.pageSize};
    if(this.statusFilter.value){
      p['status'] = this.statusFilter.value;
    }
    if(this.listType == 'auditList'){
      this.auditList(p, isReset);
    }
    if(this.listType == 'list'){
      this.myList(p, isReset);
    }
  }
  pageChange(page:number){
    if(this.currentPage != page){
      this.currentPage = page;
      this.findPage(false);
    }
  }
  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }
  view(id:number){
    let withdrawApplication = this.dataList.find(val =>{
      if(val.id == id){
        return true;
      }
      return false;
    });
    this.settlementService.withdrawApplication = withdrawApplication;
    let param = {};
    param['currentPage'] = this.currentPage;
    param['listType'] = this.listType;
    if(this.statusFilter.value){
      param['status'] = this.statusFilter.value;
    }
    this.settlementService.settlementParam = param;
    this.router.navigateByUrl("/payment/settlement/view/"+id);
  }
  create(){
    this.router.navigateByUrl("/payment/settlement/form");
  }
  changeList(type: string){
    this.listType = type;
    this.findPage(true);
  }
  auditList(p, isReset:boolean){
    this.settlementService.findAuditList(p).subscribe(ret =>{
      if(ret.code == 0){
        if(ret.data){
          this.dataList = ret.data;
          this.page = {totalNum:this.dataList.length,pageSize:this.dataList.length,reset:isReset};
        }
      }else {
        this.showAlert(ret.msg,"alert-warning");
      }
      this.loading = false;
    },error =>{
      this.showAlert("网络异常"+error.status,"alert-danger");
      this.loading = false;
    });
  }
  myList(p, isReset:boolean){
    if(p['status']){
      p['statusList'] = [p['status']];
    }
    this.settlementService.findList(p).subscribe(ret =>{
      if(ret.code == 0){
        if(ret.data){
          this.dataList = ret.data.list;
          this.page = {totalNum:ret.data.total, pageSize:this.pageSize, reset:isReset};
        }
      }else {
        this.showAlert(ret.msg,"alert-warning");
      }
      this.loading = false;
    },error =>{
      this.showAlert("网络异常"+error.status,"alert-danger");
      this.loading = false;
    });
  }

}
