import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, AbstractControl, Validators } from '@angular/forms';
import { StandardAddressService } from './standard-address.service';

import {Router} from "@angular/router";
import { debug } from 'util';

declare var $: any;


@Component({
  selector: 'app-standard-address',
  templateUrl: './standard-address.component.html',
  styleUrls: ['./standard-address.component.css']
})
export class StandardAddressComponent implements OnInit {
  public data;
  public totalPages;
  public addretype: number;
  public provinces: Array<Province> = new Array;
  public citys: Array<SelectModule> = new Array;
  public countys: Array<SelectModule> = new Array;
  public towns: Array<any> = new Array;
  public addressList: Address[];
  public searchinfo: any;
  public pageSize: number = 10;
  public pageNum: number = 1;
  public totalNum: number;
  formModel: FormGroup;
  constructor(

    public service: StandardAddressService,
    public router:Router
  ) {
    this.formModel = new FormGroup({
      sendProvince: new FormControl(),
      sendCity: new FormControl(),
      sendCounty: new FormControl(),
      firstName: new FormControl(),
      sendTown: new FormControl(),
      Company: new FormControl(),
      category: new FormControl(),
      county:new FormControl()
    });
    this.provinces = [new Province("shanxi_taiyuan", "山西省"), new Province("shanxi", "陕西省"), new Province("neimenggu", "内蒙古"), new Province("hebei", "河北省"), new Province("shandong", "山东省"), new Province("beijing", "北京")];
    this.searchinfo = {
      "address": "",
      "isDel": 0,
      "page": 1,
      "pageSize": 10,
      "province": null,
      "city": null,
      "county": null,
      "town": null,
      "type": ""
    }
  }

  type(type) {
    if(type == 1) {
      return "煤台"
    }
    if (type == 2) {
      return "煤厂"
    }
    if (type == 3) {
      return "洗煤厂"
    }
  }
  getSystemAddressList() {
    
    this.searchinfo.type = $("#category").val();
    this.searchinfo.address = $("#Company").val();
    if ($("#province").val()) {
      let pr = this.provinces.find(data => data.name = $("#province").val())
      this.searchinfo.province = pr.value;
    } else {
      this.searchinfo.province = null;
    }
    if ($("#city").val()) {
      this.searchinfo.city = $("#city").val();
    } else {
      this.searchinfo.city = null;
    }
    if ($("#county").val()) {
      this.searchinfo.county = $("#county").val();
    } else {
      this.searchinfo.county = null;
    }
    if ($("#town").val()) {
      this.searchinfo.town = $("#town").val();
    } else {
      this.searchinfo.town = null;
    }
    console.log(this.searchinfo)
    this.service.getSystemOwnerAddressList(this.searchinfo).subscribe(data => {
      if (data.code == 0) {
        this.data = data.data;
        this.totalNum = data.total;//记录总条数
        this.pageNum = data.pageNum;
      } else {

      }
    })
  }
  chooseProvince() {
    this.clearSendChoose(3);
    this.service.getProvinceList($("#province").val())
      .subscribe(data => {
        console.log(data);
        this.citys = data;
      }
      );
  }
  chooseCity() {
    this.clearSendChoose(2);
    this.citys.forEach(city => {
      if (city.name == $("#city").val()) {
        this.countys = city.value;
      }
    });
  }
  chooseCounty() {
    this.clearSendChoose(1);
    this.citys.forEach(city => {
      city.value.forEach(county => {
        if (county.name == $("#county").val()) {
          // county.value.forEach(town =>{
          // });
          console.log(county.value);
          this.towns = county.value;
        }
      });
    });
  }
  clearSendChoose(flag: number) {
    if (flag == 1) {
      this.towns = [];
    }
    if (flag == 2) {
      this.countys = [];
      this.towns = [];
    }
    if (flag == 3) {
      this.citys = [];
      this.countys = [];
      this.towns = [];
    }
  }
  searchaddre() {
    this.searchinfo.page = 1;
    this.searchinfo.pageSize=10;
    this.getSystemAddressList();
  }
  changePageNum(pageChange: number) {
    if (this.pageNum != pageChange) {
      this.pageNum = pageChange;
      this.getSystemAddressList();
    }
  }

  ngOnInit() {
    let ads = new Address();
    ads.page = 1;
    ads.pageSize = 10;
    this.service.getSystemOwnerAddressList(ads)
      .subscribe(
      data => {
        console.log(data.data);
        this.data=data.data;
        this.totalNum = data.total;
        this.totalPages = data.data.pages;
      }
    )
  }

  addSysAddress(){
    this.router.navigateByUrl("/system/standardAddress/systemaddress");
  }
  editsystemaddre(i:number){
    sessionStorage.setItem("systemaddress",JSON.stringify(this.data[i]))
    this.router.navigateByUrl("/system/standardAddress/systemaddress");
  }
   //查询条件
  find(){

  }
  //删除地址
  addressDelete(id) {
    this.service.deleteSystemOwnerAddressById(id)
      .subscribe(data =>{
        console.log(data.data);
      })
  }
}

export class Province {
  constructor(public name: string, public value: string) {
  }
}
export class SelectModule {
  public name: string;
  public value: Array<SelectModule> = new Array;
}
export class Address {
  public address: string;
  public city: string;
  public county: string;
  public isDel: number;
  public page: number;
  public pageSize: number;
  public province: string;
  public street: string;
  public town: string;
  public type: number

  constructor(

  ) { }

}
