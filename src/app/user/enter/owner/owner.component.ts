import { Component, OnInit } from '@angular/core';
import {OwnerAuthInfo, OwnerService} from "./owner.service";
import {ActivatedRoute, Route, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../component/pagination/pagination.component";
declare var $: any;

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;

  ownerAuthInfoList:OwnerAuthInfo[];

  ownerAuthQCForm: FormGroup;

  constructor(public router:Router,private routerInfo: ActivatedRoute, public ownerService:OwnerService,private formBuilder: FormBuilder) {
    this.ownerAuthQCForm = formBuilder.group({
      name: [''],
      mobile: [''],
      cardNo: [''],
      status: [''],
      title: [''],
      company: [''],
      groupCode: [''],
      address: [''],
      content: [''],
      type: ['1'],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.findPage(1);
  }

  findPage(page:number){
    this.ownerService.findList(page).subscribe(ret =>{
      if(ret.code ==0){
        this.ownerAuthInfoList = ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
      }else{
        alert(ret.msg);
      }
    });
  }

  update(ownerAuthInfo:OwnerAuthInfo){
    console.log(ownerAuthInfo);
    this.ownerService.setOwnerAuthInfo(ownerAuthInfo);
    this.router.navigateByUrl('/user/enter/owner/form/update');
  }

  searchOwnerAuthList() {
    this.pageNum = 1;
    this.listOwnerAuth();
  }

  listOwnerAuth() {
    this.ownerAuthQCForm.get("pageNum").setValue(this.pageNum);
    this.ownerAuthQCForm.get("pageSize").setValue(this.pageSize);
    this.ownerService.listOwnerAuth(this.ownerAuthQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.ownerAuthInfoList = result.data.list;
    });
  }

  chooseStatus() {
    this.ownerAuthQCForm.get("status").setValue($("#status").val());
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listOwnerAuth();
  }

}
