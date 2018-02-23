import { Component, OnInit } from '@angular/core';
import {AuditLog, AuditProcessNode, SettlementService, WithdrawApplication} from "../settlement.service";
import {AppService} from "../../../app.service";
import {FormControl} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ComponentEvent} from "../../../common/dto";
import {SessionStorage} from "../../../common/session_storage";

declare let $:any;

@Component({
  selector: 'app-settlement-view',
  templateUrl: './settlement-view.component.html',
  styleUrls: ['./settlement-view.component.css']
})
export class SettlementViewComponent implements OnInit {

  loading: boolean = false;
  saveBtn: boolean = false;

  settlement: WithdrawApplication;
  dataList: AuditLog[];
  auditProcessNodeList: AuditProcessNode[];
  id: string;
  result: FormControl =  new FormControl('');
  remark: FormControl =  new FormControl();
  isAudit: boolean = false;
  isSettlement: boolean = false;
  isCancel: boolean = false;
  constructor(private router:Router,
              private routerInfo: ActivatedRoute,
              public appService:AppService,
              public settlementService:SettlementService) { }

  ngOnInit() {
    if(this.settlementService.withdrawApplication){
      this.settlement = this.settlementService.withdrawApplication;
      let user: any = SessionStorage.getUser();
      if(user.roleId == this.settlement.currentRoleId && (this.settlement.status == '1' || this.settlement.status == '0')){
        this.isAudit = true;
      }
      if(this.settlement.createBy == user.userId){
        if(this.settlement.status == '2'){
          this.isSettlement = true;
        }
        if(this.settlement.status == '0'){
          this.isCancel = true;
        }
      }
    }else{
      //this.settlement ;
    }

    this.findLog();
    this.findAuditProcessNodeList();
  }
  findLog(){
    this.id = this.routerInfo.snapshot.params['id'];
    this.settlementService.findLogById(this.id).subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        this.dataList = ret.data;
      }else {
        this.showMsg(ret.msg,"warning");
      }
    },error =>{
      this.showMsg("网络异常"+error.status,"danger");
    });
  }
  findAuditProcessNodeList(){
    this.settlementService.findAuditProcessNodeList('WITHDRAW_DEPOSIT')
      .subscribe(ret =>{
      this.loading = false;
      if(ret.code == 0){
        this.auditProcessNodeList = ret.data;
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
  close(){
    this.router.navigateByUrl('/payment/settlement');
  }
  openAudit(){
    this.remark.reset();
    $("#auditModal").modal();

  }
  save(){
    //保存按钮
    if(this.result.invalid || this.remark.invalid){//表单验证不通过
      if(this.result.untouched || this.remark.untouched){
        this.showMsg("请填写表单信息","warning");
      }
      return;
    }
    this.saveBtn = true;
    let form = {
      id: this.id,
      result: this.result.value == "true",
      remark: this.remark.value
    };
    this.settlementService.audit(form).subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        $("#auditModal").modal('hide');
      }else{
        this.showMsg(result.msg,"warning");
        this.saveBtn = false;
      }
    },error =>{
      this.saveBtn = false;
      this.showMsg("网络异常"+error.status,"danger");
    });
  }
  settlementFun(){
    this.saveBtn = true;
    this.settlementService.settlement(this.id).subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
      }else{
        this.showMsg(result.msg,"warning");
        this.saveBtn = false;
      }
    },error =>{
      this.saveBtn = false;
      this.showMsg("网络异常"+error.status,"danger");
    });
  }
  cancel(){
    this.saveBtn = true;
    this.settlementService.cancel(this.id).subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
      }else{
        this.showMsg(result.msg,"warning");
        this.saveBtn = false;
      }
    },error =>{
      this.saveBtn = false;
      this.showMsg("网络异常"+error.status,"danger");
    });
  }

}
