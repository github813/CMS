import { Component, OnInit } from '@angular/core';
import {CpcnFeeService, CpcnRechargeFee} from "../cpcn-fee.service";
import {Router} from "@angular/router";
import {AppService} from "../../../app.service";
import {ComponentEvent} from "../../../common/dto";

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  pageSize:number = 10;
  page:{} ={totalNum: 1, pageSize: this.pageSize};
  currentPage:number = 1;
  loading:boolean = true;
  listType: string = 'rechargeList';
  dataList: CpcnRechargeFee[];
  constructor(public router:Router,
              public appService:AppService,
              public cpcnFeeService:CpcnFeeService) { }

  ngOnInit() {
    this.findPage(false);
  }

  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }
  findPage(isReset:boolean){
    this.loading = true;
    if(isReset){
      this.currentPage = 1;
    }
    let p ={page:this.currentPage};
    this.cpcnFeeService.findRechargeList(p).subscribe(ret =>{
      if(ret.code == 0){
        if(ret.data){
          this.dataList = ret.data.list;
          this.page = {totalNum:ret.data.total,pageSize:this.pageSize,reset:isReset};
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
  pageChange(page:number){
    if(this.currentPage != page){
      this.currentPage = page;
      this.findPage(false);
    }
  }

}
