import { Component, OnInit } from '@angular/core';
import {OwnerInfo,OwnerStarService} from "./owner-star.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../component/pagination/pagination.component";
declare var $: any;
@Component({
  selector: 'app-owner-star',
  templateUrl: './owner-star.component.html',
  styleUrls: ['./owner-star.component.css']
})
export class OwnerStarComponent implements OnInit {
  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;
  ownerId:number;
  ownerInfoList:OwnerInfo[];

  ownerInfoQCForm: FormGroup;

  constructor(public router:Router,private routerInfo: ActivatedRoute, public ownerService:OwnerStarService,private formBuilder: FormBuilder) {
    this.ownerInfoQCForm = formBuilder.group({
      name: [''],
      mobile: [''],
      status: [''],
      authed: ['2'],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.ownerInfoQCForm.get("authed").setValue("2");
    this.listOwnerInfo();
  }

//修改星级
  updateOwnerStar(id: number) {
    this.ownerId=id;
    this.ownerService.ownerStarById(id).subscribe(ret=>{
      if (ret.code == 0) {
        $("#starvalue").val(ret.data.star);
        $("#starEditModal").modal();
      }
    })


  }
  savestar(){
    var star=$("#starvalue").val();
    this.ownerService.ownerStarUpdate(this.ownerId,parseInt(star) ).subscribe(ret=>{
      if (ret.code == 0) {
        $("#starEditModal").modal("hide");
      }else{
        alert(ret.msg);
      }
    })
  }
  findPage(page:number){
    this.ownerService.findList(page).subscribe(ret =>{
      if(ret.code ==0){
        this.ownerInfoList = ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
      }else{
        alert(ret.msg);
      }
    });
  }

  searchOwnerInfoList() {
    this.pageNum = 1;
    this.listOwnerInfo();
  }



  listOwnerInfo() {
    this.ownerInfoQCForm.get("pageNum").setValue(this.pageNum);
    this.ownerInfoQCForm.get("pageSize").setValue(this.pageSize);
    this.ownerService.listDriverInfo(this.ownerInfoQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.ownerInfoList = result.data.list;
    });
  }

  chooseAuthed() {
    this.ownerInfoQCForm.get("authed").setValue($("#authed").val());
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listOwnerInfo();
  }

}
