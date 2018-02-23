import { Component, OnInit } from '@angular/core';
import {TruckAuthInfo, TruckAuthService} from "./truck-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../component/pagination/pagination.component";
declare var $: any;

@Component({
  selector: 'app-truck-auth',
  templateUrl: './truck-auth.component.html',
  styleUrls: ['./truck-auth.component.css']
})
export class TruckAuthComponent implements OnInit {

  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;

  truckAuthInfoList:TruckAuthInfo[];
  truckList:TruckAuthInfo[];

  truckInfoQCForm: FormGroup;

  constructor(public router:Router,
              private routerInfo: ActivatedRoute,
              public truckAuthService:TruckAuthService,
              private formBuilder: FormBuilder
  ) {
    this.truckInfoQCForm = formBuilder.group({
      owner: [''],
      mobile: [''],
      status: [''],
      truckStatus: [''],
      truckNo: [''],
      model: [''],
      content: [''],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.findPage(1);
  }

  findPage(page:number){
    this.truckAuthService.findList(page).subscribe(ret =>{
      if(ret.code ==0){
        this.truckAuthInfoList = ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
      }else{
        alert(ret.msg);
      }
    });
  }

  update(truckAuthInfo:TruckAuthInfo) {
    this.truckAuthService.setTruckAuthInfo(truckAuthInfo);
    if (truckAuthInfo.status == 0 || truckAuthInfo.status == 3) {
      //未审核状态
      this.truckAuthService.getTruckInfoListByTruckNo(truckAuthInfo.truckNo, truckAuthInfo.truckNo2)
      .subscribe((result) => {
        let goOn = true;
        this.truckList = result.data;
        if (this.truckList && this.truckList.length > 1) {
          goOn = confirm("该车辆被其他司机审核过了，确认继续审核？");
        }
        if(goOn){
          this.router.navigateByUrl('/user/enter/truck-auth/form/'+truckAuthInfo.id);
        }
      });
    } else{
      this.router.navigateByUrl('/user/enter/truck-auth/form/'+truckAuthInfo.id);
    }


  }

  searchTruckInfoList() {
    this.pageNum = 1;
    this.listTruckInfo();
  }

  listTruckInfo() {
    this.truckInfoQCForm.get("pageNum").setValue(this.pageNum);
    this.truckInfoQCForm.get("pageSize").setValue(this.pageSize);
    this.truckAuthService.listTruckInfo(this.truckInfoQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.truckAuthInfoList = result.data.list;
    });
  }

  chooseTruckStatus() {
    this.truckInfoQCForm.get("truckStatus").setValue($("#truckStatus").val());
  }

  chooseStatus() {
    this.truckInfoQCForm.get("status").setValue($("#status").val());
  }

  chooseModel() {
    this.truckInfoQCForm.get("model").setValue($("#model").val());
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listTruckInfo();
  }

}
