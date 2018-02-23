import { Component, OnInit } from '@angular/core';
import {EvaluateDTO, OwnerInfo,OwnerAddress, OwnerService} from "../owner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Page} from "../../../../component/pagination/pagination.component";
import {Form, FormBuilder, FormGroup} from "@angular/forms";
@Component({
  selector: 'app-address-detail',
  templateUrl: './address-detail.component.html',
  styleUrls: ['./address-detail.component.css']
})
export class AddressDetailComponent implements OnInit {
  addressDetailForm:FormGroup;
  public id:number;
  public OwnerAddressList:OwnerAddress[];
  public type="";
  constructor(private router:Router,
              private ownerService: OwnerService,
              private routerInfo: ActivatedRoute,
              private formBuilder: FormBuilder) {
            this.addressDetailForm = formBuilder.group({
              addtype:['']
            });
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    if(this.id){
      this.findAddressByOwnerId();
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
  findAddressByOwnerId(){
    var para;
    if(this.type==""){
      para= {"ownerId":this.id};
    }else{
      para= {"ownerId":this.id,"type":this.type};
    }

    this.ownerService.getAddressByUserId(para).subscribe(ret =>{
      console.log(ret);
      if(ret.code == 0){
        this.OwnerAddressList = ret.data;
        console.log(ret.data);
      }else {
        alert(ret.msg);
      }
    },error =>{
      //this.showMsg("网络异常"+error.status,"danger");
    });
  }
  search(){
    this.type=this.addressDetailForm.get("addtype").value;
    this.findAddressByOwnerId();
  }
  checkinfo(addressid,type){
    sessionStorage.setItem("addressid",addressid);
    sessionStorage.setItem("addrebytype","check");
    sessionStorage.setItem("type",type);
    this.router.navigateByUrl("/user/user/owner/address-edit/"+this.id);
  }
  editinfo(addressid,type){
    sessionStorage.setItem("addressid",addressid);
    sessionStorage.setItem("addrebytype","edit");
    sessionStorage.setItem("type",type);
    this.router.navigateByUrl("/user/user/owner/address-edit/"+this.id);
  }
}
