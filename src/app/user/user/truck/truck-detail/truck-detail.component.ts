import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {TruckInfo, TruckService} from "../truck.service";
declare var $: any;
@Component({
  selector: 'app-truck-detail',
  templateUrl: './truck-detail.component.html',
  styleUrls: ['./truck-detail.component.css']
})
export class TruckDetailComponent implements OnInit {
clickIndex:number = 0;
  public id:number;
  public truckInfo:TruckInfo;
  public driverPhone;
  public driverName;
  public driverId;
  public headImg;
  public truckId;
  constructor(private router:Router,
              private truckService: TruckService,
              private routerInfo: ActivatedRoute) {
    this.truckInfo = new TruckInfo(0,'','','','',0,0,0,[]);
  }

  ngOnInit() {
    this.id = this.routerInfo.snapshot.params['id'];
    if(this.id){
      this.findByTruckId();
    }else {
      alert("信息有误");
    }
  }

  findByTruckId(){
    this.truckService.findByTruckId(this.id).subscribe(ret =>{
      if(ret.code == 0){
        this.truckInfo = ret.data;
        this.truckId = ret.data.id;
        console.log(ret.data);
      }else {
        alert("信息有误");
      }
    },error =>{
      //this.showMsg("网络异常"+error.status,"danger");
    });
  }
  //检查的司机可用性
  checkMobile(){
    let phone = $('input[name="phone"]').val();
    if(phone.length==11){
      this.truckService.checkMobile1(phone)
        .subscribe(
          data => {
            console.log(data);
            if(data.code ==0 ){
              $('#name').val(data.data.name);
              this.driverPhone = phone;
              this.driverName=data.data.name;
              this.driverId=data.data.userId;
              this.headImg=data.data.headImg;
            }else if(data.code == 4008){
              alert(data.msg);
            }

          }
        );

    }
  }
  //添加司机
  addDriver() {
    let saveDriver = {
      "driverId": this.driverId,
      "moblie": this.driverPhone,
      "userId":JSON.parse(sessionStorage["user"]).userId,
      "headImg":this.headImg,
      "truckId":this.truckId,
      "name":this.driverName
    }
    this.truckService.truckAddDriver(saveDriver)
      .subscribe(
        data => {
          if(data.code==0){
            $('input[name="phone"]').val('');
            $('#name').val('');
            this.findByTruckId();
            console.log(data.data);

          }else{
            alert(data.msg)
            $('input[name="phone"]').val('');
            $('#name').val('');
          }
        }
      );
  }
  removeDriver(truckId,driverId){
    this.truckService.truckDelDriver(this.truckId,driverId).subscribe(data =>{
      if(data.code == 0){
        this.findByTruckId();
      }else {
        alert(data.msg);
      }
    })
  }
//  修改车辆载重
  truckLoad(){

    this.truckService.updateTruckLoad(this.truckId,$('input[name="truckLoad"]').val()).subscribe(data =>{

      if(data.code == 0){
        this.findByTruckId();
        $('input[name="truckLoad"]').val("")
      }else {
        alert(data.msg);
      }
    })
  }
}
