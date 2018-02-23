import { Component, OnInit } from '@angular/core';
import {EvaluateDTO, OwnerInfo, OwnerService} from "../owner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../../component/pagination/pagination.component";

@Component({
  selector: 'app-black-detail',
  templateUrl: './black-detail.component.html',
  styleUrls: ['./black-detail.component.css']
})
export class BlackDetailComponent implements OnInit {


  public id:number;
  public blackList;

  constructor(private router:Router,
              private ownerService: OwnerService,
              private routerInfo: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    if(this.id){
      this.ownerService.getOwnerBlack(this.id).subscribe(ret =>{
        if(ret.code == 0){
          this.blackList = ret.data;
        }else {
          alert(ret.msg);
        }
      },error =>{
        //this.showMsg("网络异常"+error.status,"danger");
      });
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

}
