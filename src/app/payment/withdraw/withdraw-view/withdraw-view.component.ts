import { Component, OnInit } from '@angular/core';
import {SettlementQuery, WithdrawService, WithdrawView} from "../withdraw.service";
import {ActivatedRoute, Router} from "@angular/router";
import {AppService} from "../../../app.service";
import {ComponentEvent} from "../../../common/dto";

@Component({
  selector: 'app-withdraw-view',
  templateUrl: './withdraw-view.component.html',
  styleUrls: ['./withdraw-view.component.css']
})
export class WithdrawViewComponent implements OnInit {
  withdrawView:WithdrawView;
  settlementQuery:SettlementQuery;
  loading:boolean = true;
  id:string;
  syncBtn:boolean = false;
  sendBackBtn:boolean = false;
  queryView:boolean = false;
  constructor(
    public router:Router,
    private routerInfo: ActivatedRoute,
    public appService:AppService,
    public withdrawService:WithdrawService
  ) { }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    this.withdrawService.findById(this.id).subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        this.withdrawView = ret.data;
        if(ret.data.status == 1 || ret.data.status == 4){//进行中和退汇状态可以同步
          this.syncBtn = true;
        }
        if(ret.data.status == 2){
          this.sendBackBtn = true;
        }
      }else {
        this.showMsg(ret.msg,"warning");
      }
    },error =>{
      this.showMsg("网络异常"+error.status,"danger");
    });
  }
  //显示提示信息
  showMsg(msg:string, css:string){
    css = "alert-"+css;
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }
  cancel(){
    this.router.navigateByUrl('/payment/withdraw');
  }
  sync(){
    this.loading = true;
    this.withdrawService.settlementSync(this.withdrawView.payNo).subscribe(ret=>{
        this.loading = false;
        if(ret.code == 0){
          this.syncBtn = false;
          this.showMsg("同步成功","info");
        }else{
          this.showMsg(ret.msg,"warning");
        }
      },error =>{
        this.showMsg("网络异常"+error.status,"danger");
      }
    );
  }
  sendBack(){
    this.loading = true;
    this.withdrawService.settlementSendBack(this.withdrawView.id).subscribe(ret=>{
        this.loading = false;
        if(ret.code == 0){
          this.sendBackBtn = false;
          this.showMsg("更新成功","info");
        }else{
          this.showMsg(ret.msg,"warning");
        }
      },error =>{
        this.showMsg("网络异常"+error.status,"danger");
      }
    );
  }
  query(){
    this.loading = true;
    this.withdrawService.settlementQuery(this.withdrawView.payNo).subscribe(ret=>{
        this.loading = false;
        if(ret.code == 0){
          this.queryView = true;
          this.settlementQuery = ret.data;
        }else{
          this.showMsg(ret.msg,"warning");
        }
      },error =>{
        this.showMsg("网络异常"+error.status,"danger");
      }
    );
  }



}
