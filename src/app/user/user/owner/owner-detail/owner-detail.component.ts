import { Component, OnInit } from '@angular/core';
import {OwnerInfo, OwnerService} from "../owner.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-owner-detail',
  templateUrl: './owner-detail.component.html',
  styleUrls: ['./owner-detail.component.css']
})
export class OwnerDetailComponent implements OnInit {

  public id:number;
  public ownerInfo:OwnerInfo;
  public ownerAuthList;

  constructor(private router:Router,
              private ownerService: OwnerService,
              private routerInfo: ActivatedRoute) {

  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    if(this.id){
      this.findByOwnerId();
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
  findByOwnerId(){
    this.ownerService.getOwnerDetailById(this.id).subscribe(ret =>{
      if(ret.code == 0){
        this.ownerInfo = ret.data;
        this.ownerAuthList=ret.data.ownerAuthLogList;
        console.log(ret.data);
      }else {
        alert(ret.msg);
      }
    },error =>{
      //this.showMsg("网络异常"+error.status,"danger");
    });
  }

}
