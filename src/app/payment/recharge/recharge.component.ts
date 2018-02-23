import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ComponentEvent} from "../../common/dto";
import {AppService} from "../../app.service";
import {Recharge, RechargeService} from "./recharge.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-recharge',
  templateUrl: './recharge.component.html',
  styleUrls: ['./recharge.component.css']
})
export class RechargeComponent implements OnInit {
  pageSize:number = 10;
  page:any ={totalNum:1,pageSize:this.pageSize,currentPage:1};
  currentPage:number = 1;
  loading:boolean = true;
  rechargeList:Recharge[];
  statusFilter: FormControl = new FormControl('');
  refundStatusFilter: FormControl = new FormControl('');
  tradeNoFilter: FormControl = new FormControl('');
  userCodeFilter: FormControl = new FormControl();
  typeFilter: FormControl = new FormControl('');
  mobileFilter: FormControl = new FormControl('');

  constructor(public router:Router,
              public appService:AppService,
              public rechargeService:RechargeService
  ) { }

  ngOnInit() {
    let param:any = this.rechargeService.findParam;
    if(param){
      this.currentPage = param.page;
      this.page.currentPage = param.page;
      if(param.status){
        this.statusFilter.setValue(param.status);
      }
      if(param.refundStatus){
        this.refundStatusFilter.setValue(param.refundStatus);
      }
      this.tradeNoFilter.setValue(param.tradeNo);
      this.userCodeFilter.setValue(param.userCode);
      if(param.type){
        this.typeFilter.setValue(param.type);
      }
      this.mobileFilter.setValue(param.mobile);
    }
    this.findPage(false);
  }
  findPage(isReset:boolean){
    this.loading = true;
    if(isReset){
      this.currentPage = 1;
    }
    let p = {page:this.currentPage};
    if(this.statusFilter.value){
      p['status'] = this.statusFilter.value;
    }
    if(this.userCodeFilter.value){
      p['userCode'] = this.userCodeFilter.value;
    }
    if(this.tradeNoFilter.value){
      p['tradeNo'] = this.tradeNoFilter.value;
    }
    if(this.refundStatusFilter.value){
      p['refundStatus'] = this.refundStatusFilter.value;
    }
    if(this.typeFilter.value){
      p['type'] = this.typeFilter.value;
    }
    if(this.mobileFilter.value){
      p['mobile'] = this.mobileFilter.value;
    }
    this.rechargeService.findList(p).subscribe(ret =>{
      if(ret.code == 0){
        if(ret.data){
          this.rechargeList = ret.data.list;
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
  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }
  create(){
    this.router.navigateByUrl("/payment/recharge/form");
  }
  view(id:number){
    this.router.navigateByUrl("/payment/recharge/view/"+id);
  }


}
