import { Component, OnInit } from '@angular/core';
import {RechargeService, RechargeView} from "../recharge.service";
import {AppService} from "../../../app.service";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentEvent} from "../../../common/dto";

@Component({
  selector: 'app-recharge-view',
  templateUrl: './recharge-view.component.html',
  styleUrls: ['./recharge-view.component.css']
})
export class RechargeViewComponent implements OnInit {
  rechargeView:RechargeView;
  loading:boolean = true;
  id:string;
  operatorName:string;
  synBtn:boolean = false;
  constructor(
              public router:Router,
              private routerInfo: ActivatedRoute,
              public appService:AppService,
              public rechargeService:RechargeService) { }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    this.rechargeService.findById(this.id).subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        this.rechargeView = ret.data;
        if(this.rechargeView.status == 1 && this.rechargeView.tradeType == 1376){
          this.synBtn = true;
        }
        this.renderName(this.rechargeView.operator);
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
    this.router.navigateByUrl('/payment/recharge');
  }
  renderName(id:number){
    if(id  == null || id == 0){
      this.operatorName = "系统";
      return;
    }
  }
  sync(){
    this.loading = true;
    this.rechargeService.cpcnFasterPaySync(this.rechargeView.payNo).subscribe(ret=>{
        this.loading = false;
        if(ret.code == 0){
          this.synBtn = false;
          this.showMsg("同步成功","info");
        }else{
          this.showMsg(ret.msg,"warning");
        }
      },error =>{
        this.showMsg("网络异常"+error.status,"danger");
      }
    );
  }

}
