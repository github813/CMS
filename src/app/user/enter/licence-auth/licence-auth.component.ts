import { Component, OnInit } from '@angular/core';
import {LicenceAuthInfo, LicenceAuthService} from "./licence-auth.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../component/pagination/pagination.component";
declare var $: any;

@Component({
  selector: 'app-licence-auth',
  templateUrl: './licence-auth.component.html',
  styleUrls: ['./licence-auth.component.css']
})
export class LicenceAuthComponent implements OnInit {

  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;

  licenceAuthInfoList:LicenceAuthInfo[];

  licenceAuthQCForm: FormGroup;

  constructor(public router:Router,private routerInfo: ActivatedRoute, public licenceAuthService:LicenceAuthService,private formBuilder: FormBuilder) {
    this.licenceAuthQCForm = formBuilder.group({
      name: [''],
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
    this.licenceAuthService.findList(page).subscribe(ret =>{
      if(ret.code ==0){
        this.licenceAuthInfoList = ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
      }else{
        alert(ret.msg);
      }
    });
  }

  update(licenceAuthInfo:LicenceAuthInfo){
    console.log(licenceAuthInfo);
    this.licenceAuthService.setLicenceAuthInfo(licenceAuthInfo);
    this.router.navigateByUrl('/user/enter/licence-auth/form/update');
  }

  searchLicenceAuthList() {
    this.pageNum = 1;
    this.listLicenceAuth();
  }

  listLicenceAuth() {
    this.licenceAuthQCForm.get("pageNum").setValue(this.pageNum);
    this.licenceAuthQCForm.get("pageSize").setValue(this.pageSize);
    this.licenceAuthService.listLicenceAuth(this.licenceAuthQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.licenceAuthInfoList = result.data.list;
    });
  }

  chooseStatus() {
    this.licenceAuthQCForm.get("status").setValue($("#status").val());
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listLicenceAuth();
  }

}
