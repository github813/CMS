import { Component, OnInit } from '@angular/core';
import {EvaluateDTO, OwnerInfo, OwnerService} from "../owner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../../component/pagination/pagination.component";

@Component({
  selector: 'app-evaluate-detail',
  templateUrl: './evaluate-detail.component.html',
  styleUrls: ['./evaluate-detail.component.css']
})
export class EvaluateDetailComponent implements OnInit {
  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;

  public id:number;
  public evaluateDTOList:EvaluateDTO[];

  constructor(private router:Router,
              private ownerService: OwnerService,
              private routerInfo: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    if(this.id){
      this.findEvaluateByOwnerId();
    }else {
      alert("信息有误");
    }
  }

  showUserDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/owner-detail/"+id);
  }

  showOrderDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/order-detail/"+id);
  }

  showEvaluateDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/evaluate-detail/"+id);
  }
  showAddressDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/address-detail/"+id);
  }
  showBlackDetail(id:number){
    this.router.navigateByUrl("/user/user/owner/black-detail/"+id);
  }
  findEvaluateByOwnerId(){
    this.ownerService.getOwnerEvaluateByUserId(this.id).subscribe(ret =>{
      console.log(ret);
      if(ret.code == 0){
        this.evaluateDTOList = ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
        console.log(ret.data);
      }else {
        alert(ret.msg);
      }
    },error =>{
      //this.showMsg("网络异常"+error.status,"danger");
    });
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.findEvaluateByOwnerId();
  }
}
