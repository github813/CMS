import { Component, OnInit } from '@angular/core';
import {AppService} from "../../app.service";
import {Router} from "@angular/router";
import {BankCard, BankCardService} from "./bank-card.service";
import {FormControl} from "@angular/forms";
import {ComponentEvent} from "../../common/dto";
import {Dictionary} from "../../common/dictionary";
declare let _:any;

@Component({
  selector: 'app-bank-card',
  templateUrl: './bank-card.component.html',
  styleUrls: ['./bank-card.component.css']
})
export class BankCardComponent implements OnInit {
  pageSize:number = 10;
  page:{} ={totalNum:1,pageSize:this.pageSize,currentPage:1};
  currentPage:number = 1;
  loading:boolean = true;
  dataList:BankCard[];
  bankList:any;
  userCodeFilter: FormControl = new FormControl();
  bankCodeFilter: FormControl = new FormControl('');
  mobileFilter: FormControl = new FormControl();
  cardNoFilter: FormControl = new FormControl();
  fasterFilter: FormControl = new FormControl('');
  constructor(public router:Router,
              public appService:AppService,
              public service:BankCardService) {
    this.bankList = _.pairs(Dictionary.bankCode);
  }

  ngOnInit() {

    this.findPage(false);
  }
  findPage(isReset:boolean){
    this.loading = true;
    if(isReset){
      this.currentPage = 1;
    }
    let p:any ={page:this.currentPage};
    if(this.userCodeFilter.value){
      p.userCode = this.userCodeFilter.value;
    }
    if(this.bankCodeFilter.value){
      p.bankCode = this.bankCodeFilter.value;
    }
    if(this.mobileFilter.value){
      p.mobile = this.mobileFilter.value;
    }
    if(this.cardNoFilter.value){
      p.cardNo = this.cardNoFilter.value;
    }
    if(this.fasterFilter.value){
      p.faster = this.fasterFilter.value;
    }
    this.service.findList(p).subscribe(ret =>{
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
  create(){
    this.router.navigateByUrl("/payment/bankCard/form");
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

}
