import { Component, OnInit } from '@angular/core';
import {OwnerAddress, OwnerInfo, OwnerService} from "../owner.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {AppComponent} from "../../../../app.component";

declare let $:any;
@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {

  phone:FormControl =  new FormControl();
  name:FormControl =  new FormControl();
  public id:number;
  public addressid:number;
  public addretype:number;
  public addrebytype:string;
  public ownerAddress;
  public AddressContacts;
  public AddreInspector;
  public addtype=0;
  public modalTitle:string;
  public errortext:string;
  public contactId:number;
  // public
  constructor(public appComponent:AppComponent,
              private router:Router,
              private ownerService: OwnerService,
              private routerInfo: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    this.addressid=parseInt(sessionStorage.getItem("addressid")) ;
    this.addretype=parseInt(sessionStorage.getItem("type"));
    this.addrebytype=sessionStorage.getItem("addrebytype");
    if(this.id&&this.addressid){
      if(this.addrebytype=="check"){
        this.findAddreInfoById();
      }
      this.findAddreContactById();
      this.findAddreInspectorById()
    }else {
      alert("信息有误");
    }
    let self=this;
    $("#phone").bind("input propertychange change",function(event){
      let phone=$("#phone").val();
      if(phone.length==11){
        self.ownerService.CheckMobile(phone).subscribe(ret =>{
          if(ret.code == 0){
             if(ret.data.authed==1){
               this.errortext="需该用户审核通过后才可添加";
             }else if(ret.data.authed==0){
               this.errortext="需该用户审核通过后才可添加";
             }else{
               $("#name").val(ret.data.name);
               self.contactId=ret.data.userId;
             }
          }else {
            this.errortext="需该用户审核通过后才可添加";
          }
        },error =>{
          // this.showMsg("网络异常"+error.status,"danger");
        });
      }else{
        $("#name").val("");
      }
    })
  }

  showUserDetail(id: number){
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
  findAddreInfoById(){
    var para={"ownerId":this.id.toString(),"addressId":this.addressid};
    this.ownerService.getAddressById(para).subscribe(ret =>{
      if(ret.code == 0){
        this.ownerAddress = ret.data;
        console.log( ret.data);
      }else {
        alert(ret.msg);
      }
    },error =>{
      // this.showMsg("网络异常"+error.status,"danger");
    });
  }
  findAddreContactById(){
    var para={"ownerId":this.id.toString(),"addressId":this.addressid,"type":this.addretype};
    this.ownerService.getAddressContacts(para).subscribe(ret =>{
      if(ret.code == 0){
        this.AddressContacts = ret.data;
      }else {
        alert(ret.msg);
      }
    },error =>{
      // this.showMsg("网络异常"+error.status,"danger");
    });
  }
  findAddreInspectorById(){
    var para={"ownerId":this.id.toString(),"addressId":this.addressid,"type":3};
    this.ownerService.getAddressContacts(para).subscribe(ret =>{
      if(ret.code == 0){
        this.AddreInspector = ret.data;
      }else {
        alert(ret.msg);
      }
    },error =>{
      // this.showMsg("网络异常"+error.status,"danger");
    });
  }
  editinfo(addressid){
     this.addrebytype="edit";
  }
  delete(i,type){
    var iscandel=false;
    if(type==0){
      if(this.AddressContacts[i].main==1){
        alert("主联系人不可删");
      }else{
        iscandel=true;
      }
    }else{
      iscandel=true;
    }
    if(iscandel){
      let delid ;
      if(type==0) {
        delid = this.AddressContacts[i].id;
      }else{
        delid = this.AddreInspector[i].id;
      }
      var para={"ownerId":this.id.toString(),"ownerAddressContactsId":delid};
      this.ownerService.DeladdressContact(para).subscribe(ret =>{
        if(ret.code == 0){
         this.showMsg("删除成功");
          if(type==3){
           this.findAddreInspectorById();
          }else{
            this.findAddreContactById();
          }
        }else {
          alert(ret.msg);
        }
      },error =>{
        // this.showMsg("网络异常"+error.status,"danger");
      });
    }

  }
  addcontact(type){
    this.addtype=type;
    if(type==0){
      this.modalTitle = "添加联系人";
    }else{
      this.modalTitle = "添加质检员";
    }

    $("#contactAddModal").modal();
  }
  save(){

    if(this.contactId){//表单验证不通过
      var para ;
      if(this.addtype==3){
        para={
          "addressId": this.addressid,
          "contactId": this.contactId,
          "ownerId": this.id.toString(),
          "type": 3
        };
      }else{
        para={
          "addressId": this.addressid,
          "contactId": this.contactId,
          "ownerId": this.id.toString(),
          "type": this.addretype
        };
      }
      this.ownerService.AddaddressContact(para).subscribe(ret =>{
        if(ret.code == 0){
          $("#contactAddModal").modal('hide');
          if(this.addtype==3){
            this.findAddreInspectorById();
          }else{
            this.findAddreContactById();
          }
        }else {
          alert(ret.msg);
        }
      },error =>{
        // this.showMsg("网络异常"+error.status,"danger");
      });
    }else{
      this.showMsg("请填写表单信息");
      return;
    }

  }
  setmain(i){
    this.ownerService.AddreContactsetmain(this.id.toString(),this.addressid.toString(),this.AddressContacts[i].contactId).subscribe(ret =>{
      if(ret.code == 0){
        this.showMsg("操作成功");
        this.findAddreContactById();
      }else {
        alert(ret.msg);
      }
    },error =>{
      // this.showMsg("网络异常"+error.status,"danger");
    });
  }
  showMsg(msg:string){
    this.appComponent.showToast(msg);
  }
}
