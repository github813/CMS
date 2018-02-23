import { Component, OnInit } from '@angular/core';
import {ExpService,DriverInfo} from "../exp.service";
import {Router,NavigationEnd } from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../../component/pagination/pagination.component";
import {SessionStorage} from "../../../../common/session_storage";
import {AppComponent} from "../../../../app.component";

declare var $: any;
@Component({
  selector: 'app-ownerexp',
  templateUrl: './ownerexp.component.html'
})
export class OwnerexpComponent implements OnInit {

  pageNum: number;
  pageSize: number = 10;
  totalNum: number = 0;
  totalPages: number;
  userId:number;
  hasReturnFee:number;
  ownerInfoList: DriverInfo[];

  ownerInfoQCForm: FormGroup;

  constructor(public expService: ExpService, private router: Router, private appComponent:AppComponent,private formBuilder: FormBuilder) {
    this.ownerInfoQCForm = formBuilder.group({
      name: [''],
      mobile: [''],
      star: [''],
      gradeno: [''],
      pageNum: ['1'],
      pageSize: ['10'],
      usertype:['owner']
    });

  }

  ngOnInit() {

    let param:any = this.expService.findParam;
    if(param){
      if(param.usertype=="owner"){
        this.ownerInfoQCForm.get("name").setValue(param.name);
        this.ownerInfoQCForm.get("mobile").setValue(param.mobile);
        this.ownerInfoQCForm.get("star").setValue(param.star);
        this.ownerInfoQCForm.get("pageNum").setValue(param.pageNum);
      }
    }else{
      this.ownerInfoQCForm.get("pageNum").setValue("1");
    }
    let self=this;
    setTimeout(function () {
      $("#star").val(self.ownerInfoQCForm.get("star").value);
    },100);
    this.findPage();
  }



  findPage() {
    this.expService.OwnerInfoquery(this.ownerInfoQCForm.value).subscribe(ret => {
      if (ret.code == 0) {
        this.ownerInfoList = ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
      } else {
        alert(ret.msg);
      }
    }, d => {
      console.log(d)
    });
  }

  //导出到excel
  exportToExcel() {
    // var link = document.createElement("a");
    // this.driverService.exportDriverUserToExcel().subscribe(data => {
    //     link.setAttribute("href", window.URL.createObjectURL(data));
    //     link.setAttribute("download", "司机列表" + Date.now() + ".xls");
    //     link.style.visibility = "hidden";
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // );
  }

  searchOwnerInfoList() {

    this.ownerInfoQCForm.get("pageNum").setValue(1);
    this.findPage();
  }

  chooseStar() {
    this.ownerInfoQCForm.get("star").setValue($("#star").val());
  }

  changePageNum(page: Page) {
    this.pageNum= page.pageNum;
    this.pageSize = page.pageSize;
    this.ownerInfoQCForm.get("pageNum").setValue(page.pageNum);
    this.ownerInfoQCForm.get("pageSize").setValue( page.pageSize);
    this.findPage();
  }
  ownerAddexp(i:number,type:string){
    let owner= this.ownerInfoList[i];
    let id=owner.userId;
    SessionStorage.setObject("userinfo",owner);
    this.router.navigateByUrl("/user/user/exp/driversaveexp/owner/"+type+"/"+id);
  }
  showownerexp(i:number,exp:number){
    let owner= this.ownerInfoList[i];
    let id=owner.userId;
    SessionStorage.setObject("userinfo",owner);
    this.router.navigateByUrl("/user/user/exp/exploglist/owner/"+id)
  }
  showhasreturn(i:number){
    this.userId=this.ownerInfoList[i].userId;
    this.hasReturnFee=this.ownerInfoList[i].hasReturnFee;
    $("#hasreturn").val(this.hasReturnFee);
    $("#modal-warning").modal();
  }
  updatehasreturn(){
    this.hasReturnFee=$("#hasreturn").val();
      this.expService.updateHasReturnFeeByUserId(this.userId,this.hasReturnFee).subscribe(
        data=>{
          $('#modal-warning').modal('hide');
          if(data.code==0){
            this.showMsg("操作成功","success");
            this.findPage();
          }else{
            this.showMsg(data.msg,"warning");
          }
        }
      )

  }
  //显示提示信息
  showMsg(msg:string, css:string){
    this.appComponent.showAlert(msg,"alert-"+css);
  }
}
