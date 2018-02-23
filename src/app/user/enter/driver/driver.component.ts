import { Component, OnInit } from '@angular/core';
import {DriverAuthInfo, DriverService} from "./driver.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../component/pagination/pagination.component";
declare var $: any;

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;

  driverAuthInfoList: DriverAuthInfo[];

  driverAuthQCForm: FormGroup;

  constructor(public router:Router,private routerInfo:ActivatedRoute, public driverService:DriverService,private formBuilder: FormBuilder) {
    this.driverAuthQCForm = formBuilder.group({
      name: [''],
      mobile: [''],
      cardNo: [''],
      status: [''],
      content: [''],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.findPage(1);
  }

  findPage(page:number){
    this.driverService.findList(page).subscribe(ret =>{
      if(ret.code ==0){
        this.driverAuthInfoList = ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
      }else{
        alert(ret.msg);
      }
    });
  }

  update(driverAuthInfo:DriverAuthInfo){
    console.log(driverAuthInfo);
    this.driverService.setDriverAuthInfo(driverAuthInfo);
    this.router.navigateByUrl('/user/enter/driver/form/update');
  }

  searchDriverAuthList() {
    this.pageNum = 1;
    this.listDriverAuth();
  }

  listDriverAuth() {
    this.driverAuthQCForm.get("pageNum").setValue(this.pageNum);
    this.driverAuthQCForm.get("pageSize").setValue(this.pageSize);
    this.driverService.listDriverAuth(this.driverAuthQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.driverAuthInfoList = result.data.list;
    });
  }

  chooseStatus() {
    this.driverAuthQCForm.get("status").setValue($("#status").val());
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listDriverAuth();
  }

}
