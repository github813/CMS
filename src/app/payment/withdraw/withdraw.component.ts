import { Component, OnInit } from '@angular/core';
import {Withdraw, WithdrawService} from "./withdraw.service";
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {ComponentEvent} from "../../common/dto";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-withdraw',
  templateUrl: './withdraw.component.html',
  styleUrls: ['./withdraw.component.css']
})
export class WithdrawComponent implements OnInit {

  pageSize:number = 10;
  page:{} ={totalNum:1,pageSize:this.pageSize,currentPage:1};
  currentPage:number = 1;
  loading:boolean = true;
  dataList:Withdraw[];
  statusFilter: FormControl = new FormControl('');
  payNoFilter: FormControl = new FormControl();
  userCodeFilter: FormControl = new FormControl();
  mobileFilter: FormControl = new FormControl();

  constructor(public router:Router,
              public appService:AppService,
              public withdrawService:WithdrawService ) {

  }

  ngOnInit() {
    let param:any = this.withdrawService.findParam;
    if(param){
      this.currentPage = param.page;
      this.page['currentPage'] = param.page;
      if(param.status){
        this.statusFilter.setValue(param.status);
      }
      this.payNoFilter.setValue(param.payNo);
      this.userCodeFilter.setValue(param.userCode);
      this.mobileFilter.setValue(param.mobile);
    }
    this.findPage(false);
  }

  findPage(isReset:boolean){
    this.loading = true;
    if(isReset){
      this.currentPage = 1;
    }
    let p ={page:this.currentPage};
    if(this.statusFilter.value){
      p['status'] = this.statusFilter.value;
    }
    if(this.payNoFilter.value){
      p['payNo'] = this.payNoFilter.value;
    }
    if(this.userCodeFilter.value){
      p['userCode'] = this.userCodeFilter.value;
    }
    if(this.mobileFilter.value){
      p['mobile'] = this.mobileFilter.value;
    }
    this.withdrawService.findList(p).subscribe(ret =>{
      if(ret.code == 0){
        if(ret.data){
          this.dataList = ret.data.list;
          this.page = {
            totalNum:ret.data.total,
            pageSize:this.pageSize,
            reset:isReset,
            currentPage:this.currentPage
          };
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
  view(id:number){
    this.router.navigateByUrl("/payment/withdraw/view/"+id);
  }

}
