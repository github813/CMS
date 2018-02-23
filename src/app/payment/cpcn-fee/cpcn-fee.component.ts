import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AppService} from "../../app.service";
import {CpcnFeeService} from "./cpcn-fee.service";
import {ComponentEvent} from "../../common/dto";

@Component({
  selector: 'app-cpcn-fee',
  templateUrl: './cpcn-fee.component.html',
  styleUrls: ['./cpcn-fee.component.css']
})
export class CpcnFeeComponent implements OnInit {
  pageSize:number = 10;
  page:{} ={totalNum: 1, pageSize: this.pageSize};
  currentPage:number = 1;
  loading:boolean = true;
  constructor(public router:Router,
              public appService:AppService,
              public cpcnFeeService:CpcnFeeService) { }

  ngOnInit() {

  }

  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }


}
