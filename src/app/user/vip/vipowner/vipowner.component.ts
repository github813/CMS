import { Component, OnInit } from '@angular/core';
import {ComponentEvent} from "../../../common/dto";
import {AppService} from "../../../app.service";
import {Router} from "@angular/router";
import { Vipowner, VipownerService} from "./vipowner.service";
declare var $;
declare var md5;
@Component({
  selector: 'app-vipowner',
  templateUrl: './vipowner.component.html',
  styleUrls: ['./vipowner.component.css']
})
export class VipownerComponent implements OnInit {
public param;//data;
  public ChangeVipIndex:number;
  pageSize:number = 10;
  page:any ={totalNum:1,pageSize:this.pageSize,currentPage:1};
  currentPage:number = 1;
  loading:boolean = true;
  vipownerList:any[];
  constructor(
    public router:Router,
    public appService:AppService,
    public vipownerService:VipownerService
  ) { }

  ngOnInit() {
    this.VipList();




  }
  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }
  VipList(){
    let param: any = this.vipownerService.findParam;
    if (param) {
      this.currentPage = param.page;
      this.page.currentPage = param.page;
    }
    this.findPage(false);
  }
  findPage(isReset:boolean){
    this.loading = true;
    if(isReset){
      this.currentPage = 1;
    }
    let name= $('#ownername').val();
    let mobile= $('#ownermobile').val();
    let p = {pageNum:this.currentPage,name,mobile};

    this.vipownerService.VipList(p).subscribe(ret => {
      if (ret.code == 0) {
        //this.data = ret.data.list
        //console.log(this.data)
        if (ret.data) {
          this.vipownerList = ret.data.list;
          this.page = {totalNum:ret.data.total,pageSize:this.pageSize,reset:isReset};
        }
      } else {
        this.showAlert(ret.msg, "alert-warning");
      }
      this.loading = false;
    }, error => {
      this.showAlert("网络异常" + error.status, "alert-danger");
      this.loading = false;
    });
  }
  pageChange(page:number){
    if(this.currentPage != page){
      this.currentPage = page;
      this.findPage(false);
    }
  }
  VipSave(){
    if($('#name').val()==''){
      alert('请填写姓名');
      return
    }
    if($('#mobile').val()==''){
      alert('请填写手机号');
      return
    }
    if(!($('#pwd').val().length > 5 && $('#pwd').val().length < 13) ){
      alert('密码不能低于6位多于12位');
      return
    }
    if($('#pwd').val()==''){
      alert('请填写密码');
      return
    }
    this.vipownerService.VipSave({
      "mobile": $('#mobile').val(),
      "name": $('#name').val(),
      "pwd":md5($('#pwd').val()),
    }).subscribe(
            data => {
              if(data.code == 0){
                $('#name').val('');
                $('#mobile').val('');
                $('#pwd').val('');
                this.VipList();
                $('#myModal').modal('hide');
                this.showAlert("操作成功","alert-success");
              }else {
                $('#name').val('');
                $('#mobile').val('');
                $('#pwd').val('');
                this.showAlert(data.msg,"alert-warning");
                $('#myModal').modal('hide');
              }

            })
  }
  changeVip(){
    if($('#changeType').val() ==''){
      alert('请选择需要修改的内容');
      return;
    }
    if($('#changeVal').val() ==''){
      alert('请填写需要修改的内容');
      return;
    }
    this.vipownerService.VipUpdate({
      "id": this.vipownerList[this.ChangeVipIndex].id,
      "key": $('#changeType').val(),
      "value":$('#changeType').val() !== "pwd"?$('#changeVal').val():md5($('#changeVal').val())
    }).subscribe(
            data => {
              if(data.code == 0){
                $('#changeVal').val('');
                this.VipList();
                $('#myModa2').modal('hide');
                this.showAlert("操作成功","alert-success");
              }else {
                $('#changeVal').val('');
                $('#myModa2').modal('hide');
                this.showAlert(data.msg,"alert-warning");
              }
        })
  }
  ChangeVipDisable(Index,status){
    this.vipownerService.VipUpdate({
      "id": this.vipownerList[Index].id,
      "key": "status",
      "value":status == 1? 0:1
    }).subscribe(
            data => {
              if(data.code == 0){
                this.VipList();
                $('#myModa2').modal('hide');
                this.showAlert("操作成功","alert-success");
              }else {
                $('#myModa2').modal('hide');
                this.showAlert(data.msg,"alert-warning");
              }
        })
  }
  submit(){
this.VipList();
  }
  gobank(){
    $('#ownername').val("");
    $('#ownermobile').val("")
    this.VipList();
  }
}
