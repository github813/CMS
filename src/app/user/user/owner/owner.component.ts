import { Component, OnInit } from '@angular/core';
import {OwnerInfo, OwnerService} from "./owner.service";
import {ActivatedRoute, Router} from "@angular/router";
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

  ownerInfoList:OwnerInfo[];

  ownerInfoQCForm: FormGroup;

  constructor(public router:Router,private routerInfo: ActivatedRoute, public ownerService:OwnerService,private formBuilder: FormBuilder) {
    this.ownerInfoQCForm = formBuilder.group({
      name: [''],
      mobile: [''],
      status: [''],
      authed: [''],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.findPage(1);
  }

  showUserDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/owner-detail/"+id);
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

  /**
   * 导出货主到excel
   */
  exportToExcel() {
    var link = document.createElement("a");
    this.ownerService.exportOwnerUserToExcel().subscribe(data => {
        link.setAttribute("href", window.URL.createObjectURL(data));
        link.setAttribute("download", "货主列表" + Date.now() + ".xls");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    );
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
