import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DriverInfo, DriverService} from "../driver.service";

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  public id:number;
  public carId:number;
  public driverInfo:DriverInfo;
  clickIndex:number = 0;

  constructor(private router:Router,
              private driverService: DriverService,
              private routerInfo: ActivatedRoute) {
    this.driverInfo = new DriverInfo(0,'','',0,0,0,0,'','','',[]);
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    if(this.id){
      this.findByDriverId();
    }else {
      alert("信息有误");
    }
  }

  showOrderDetail(id:number){
    this.router.navigateByUrl("/user/user/driver/order-detail/"+id);
  }

  showUserDetail(id:number){
    this.router.navigateByUrl("/user/user/driver/user-detail/"+id);
  }

  showEvaluateDetail(id:number){
    this.router.navigateByUrl("/user/user/driver/evaluate-detail/"+id);
  }

  findByDriverId(){
    this.driverService.findByDriverId(this.id).subscribe(ret =>{
      if(ret.code == 0){
        this.driverInfo = ret.data;
        console.log(ret.data);
      }else {
        alert("信息有误");
      }
    },error =>{
      //this.showMsg("网络异常"+error.status,"danger");
    });
  }
remove(id){
    this.driverService.deleteTruck(id).subscribe(data =>{
      if(data.code == 0){
        this.findByDriverId();
      }else {
        alert(data.msg);
      }
    })
}
}
