import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StandardAddressService} from "../standard-address.service";
import {AppComponent} from "../../../app.component";
import {Router} from "@angular/router";
declare let AMap: any;
declare let AMapUI: any;
declare let $: any;
declare let layer: any;
@Component({
  selector: 'app-addsystem-address',
  templateUrl: './addsystem-address.component.html',
  styleUrls: ['./addsystem-address.component.css']
})
export class AddsystemAddressComponent implements OnInit {
  formModel: FormGroup;
  public address:any;
  public newAddress;
  public map: AddsystemAddressComponent;
  constructor(private formBuilder:FormBuilder,
              public appComponent:AppComponent,
  public router:Router,
  public standardAddressService:StandardAddressService) {
    this.formModel = formBuilder.group({
      maxaddress:['',[Validators.required]],
      address:['',[Validators.required]],
      type:['',[Validators.required]]
    })
  }

  ngOnInit() {
    let self=this;
    this.address=new Address();
    this.newAddress=new Address();
    let sysaddre=JSON.parse(sessionStorage.getItem("systemaddress"));
    if(sysaddre){
      this.address=sysaddre;
      this.formModel.get("maxaddress").setValue(self.address.province+self.address.city+self.address.county+self.address.town+self.address.street)
      this.formModel.get("address").setValue(self.address.address);
      this.formModel.get("type").setValue(self.address.type);

      console.log(this.address);
    }
    let mapcity=this.address['city']||'北京市';
    let mapprovince=this.address['province']||'北京市';
    // let mapcity= '北京市';
    // let mapprovince= '北京市';
    let zxsCitys=["北京市","上海市","天津市","重庆市"];//直辖市
    let ischange=0;
    //初始化地图
    let map = this.map = new AMap.Map("container", {
      mapStyle: 'amap://styles/5e82a5b7757d00214ead15830af9195a',//样式URL
      buttonOffset: new AMap.Pixel(10, 20),//定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
      buttonPosition: 'RB',
      resizeEnable: true,
      zoom: 15
    });

    AMap.service('AMap.DistrictSearch', function() {
      //回调函数 实例化DistrictSearch
      let districtSearch = new AMap.DistrictSearch();
      //TODO: 使用districtSearch对象调用行政区查询的功能
      districtSearch.search('中国', function(status, result) {
        console.log('地区:', result);

        let subDistricts = result.districtList[0].districtList;
        let select: any = document.getElementById('subDistricts');
        for (let i = 0; i < subDistricts.length; i += 1) {
          let name = subDistricts[i].name;
          let option = document.createElement('option');
          option.value = option.innerHTML = name;
          option.dataset['citycode'] = subDistricts[i].citycode;
          select.appendChild(option);
        }
        select.onchange = function() {
          map.setZoom(12);
          map.setCity(this.value);
          let pro=this.value;
          $('#subCity').empty();
          ischange=1;
          $("#keyword").val('');
          getCitylist(pro);
        };
        select.value=subDistricts[0].name;
        if(mapprovince!=''){
          select.value=mapprovince;
        }
        getCitylist(mapprovince);
      })
      let getCitylist= function(pro){
        let select1: any = document.getElementById('subCity');
        if(zxsCitys.indexOf(pro)>-1){
          let option = document.createElement('option');
          option.value = option.innerHTML = pro;
          select1.appendChild(option);
          select1.value=pro;
          SelectMapCity();
        }else{
          districtSearch.search(pro, function(status, result) {
            console.log('市:', result);
            let citys = result.districtList[0].districtList;

            for (let i = 0; i < citys.length; i += 1) {
              let name = citys[i].name;
              let option = document.createElement('option');
              option.value = option.innerHTML = name;
              option.dataset['citycode'] = citys[i].citycode;
              select1.appendChild(option);
            }
            select1.value=citys[0].name;
            if(ischange==0&&mapcity!=''){
              select1.value=mapcity;
            }
            SelectMapCity();
          })
        }
        select1.onchange = function() {
          SelectMapCity();
        }
      }
      //
      let SelectMapCity=function () {
        let mapcityname=$('#subCity').val().replace('市','');

        Searchmap(mapcityname);
        // map.autocomplete= new AMap.Autocomplete(autoOptions);
        // this.placeSearch.setCity(mapcityname);
      }
    });
    var Searchmap=function (cityname) {
      AMap.plugin(['AMap.Autocomplete', 'AMap.PlaceSearch'], function() {
        let autoOptions = {
          city: cityname, //城市，默认全国
          input: "keyword"//使用联想输入的input的id
        };
        map.autocomplete = new AMap.Autocomplete(autoOptions);
        var placeSearch = new AMap.PlaceSearch({
          city: mapcity.replace('市',''),
          map: map
        })
        AMap.event.addListener(map.autocomplete, "select", function(e) {

          //placeSearch.search(e.poi.name);
          //placeSearch.setCity(e.poi.adcode);
          //placeSearch.search(e.poi.name);  //关键字查询查询
          console.log(e);
          map.setCenter(e.poi.location);
          map.setZoom(15);
        });
        // $("#subCity").addListener()

      });
    }
    //拖拽地图选址
    AMapUI.loadUI(['misc/PositionPicker'], function(PositionPicker) {
      let positionPicker = new PositionPicker({
        mode: 'dragMap',
        map: map
      });
      positionPicker.on('success', function(positionResult) {
        // console.log('附近信息:', positionResult);
        let data = {};
        let addressComponent = positionResult.regeocode.addressComponent;
        data['province'] = addressComponent.province;
        data['city'] = addressComponent.city || data['province'];
        data['county'] = addressComponent.district;
        data['town'] = addressComponent.township;
        data['street'] = positionResult.address;
        data['street'] = data['street'].replace(data['province'], '')
          .replace(data['city'], '')
          .replace(data['county'], '')
          .replace(data['town'], '');
        // .replace(/市$/, '')
        data['latitude'] = positionResult.position.lat;
        data['longitude'] = positionResult.position.lng;
        // sessionStorage['mapReceiveInfo'] = JSON.stringify(data);
        // self.address = data;
        Object.assign(self.address, data);
        // $('#address').val(positionResult.address);
        // $('#mapnowaddre').html(positionResult.address);
        self.formModel.get("maxaddress").setValue(positionResult.address);
        self.newAddress = data;
      });
      positionPicker.start();
    });
    AMap.plugin(['AMap.Geolocation', 'AMap.ToolBar', 'AMap.OverView', 'AMap.Scale'], function() {
      map.addControl(new AMap.ToolBar({ visible: true }));
      // map.addControl(new AMap.Scale());
      // map.addControl(new AMap.OverView({isOpen:true}));
      // map.addControl(new BasicControl.Zoom({visible: true}));
      let geolocation = map.posMapGeolocation = new AMap.Geolocation({
        enableHighAccuracy: true,//是否使用高精度定位，默认:true
        timeout: 10000,          //超过10秒后停止定位，默认：无穷大
        zoomToAccuracy: true,      //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false

      });
      map.addControl(geolocation);
      if (self.address) {//存在地址信息，跳转到对应经纬度
        map.setCenter(new AMap.LngLat(self.address.longitude, self.address.latitude));
        map.setZoom(15);
      } else {
        map.posMapGeolocation.getCurrentPosition();
        layer.msg('正在定位...');
      }
    });
  }
  //取消按钮
  cancel(){
    sessionStorage.removeItem("systemaddress");
    this.router.navigateByUrl('/system/standardAddress');
  }

  //保存按钮
  save(){

    if(this.formModel.invalid){//表单验证不通过
      this.showMsg("请填写表单信息","warning");
      return;
    }else{
      this.address.province=this.newAddress.province;
      this.address.city=this.newAddress.city;
      this.address.county=this.newAddress.county;
      this.address.town=this.newAddress.town;
      this.address.street=this.newAddress.street;
      this.address.latitude=this.newAddress.latitude;
      this.address.longitude=this.newAddress.longitude;
      this.address.type=this.formModel.get("type").value;
      this.address.address=this.formModel.get("address").value;
      if(this.address.id){
        this.standardAddressService.editSystemOwnerAddress(this.address).subscribe(data=>{
          if(data.code==0){
            this.showMsg("操作成功","success");
            sessionStorage.removeItem("systemaddress")
            this.router.navigateByUrl('/system/standardAddress');
          }else{
            this.showMsg(data.msg,"warning");
          }
        })
      }else{
        this.standardAddressService.saveSystemOwnerAddress(this.address).subscribe(data=>{
          if(data.code==0){
            this.showMsg("操作成功","success");
            this.router.navigateByUrl('/system/standardAddress');
          }else{
            this.showMsg(data.msg,"warning");
          }
        })
      }

    }
  }
  //显示提示信息
  showMsg(msg:string, css:string){
    this.appComponent.showAlert(msg,"alert-"+css);
  }


}
export class Address {
  public address: string;
  public city: string;
  public county: string;
  public isDel: number;
  public province: string;
  public street: string;
  public town: string;
  public type: number;
  public latitude: string;
  public longitude: string;

  constructor() {
  }
}
