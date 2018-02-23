import {Component, OnInit} from '@angular/core';
import {DriverInfo,DriverStarService} from "./driver-star.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../component/pagination/pagination.component";
declare var $: any;
@Component({
  selector: 'app-driver-star',
  templateUrl: './driver-star.component.html',
  styleUrls: ['./driver-star.component.css']
})
export class DriverStarComponent implements OnInit {

  pageNum: number;
  pageSize: number = 10;
  totalNum: number = 0;
  totalPages: number;
  driverId:number;
  driverInfoList: DriverInfo[];

  driverInfoQCForm: FormGroup;

  constructor(public driverService: DriverStarService, private router: Router, private formBuilder: FormBuilder) {
    this.driverInfoQCForm = formBuilder.group({
      name: [''],
      mobile: [''],
      status: [''],
      authed: [''],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.driverInfoQCForm.get("authed").setValue("2");
    this.listDriverInfo();
  }
  //修改司机星级
  updateDriverStar(id: number) {
    this.driverId=id;
    this.driverService.driverStarById(id).subscribe(ret=>{
      if (ret.code == 0) {
        $("#starvalue").val(ret.data.star);
        $("#starEditModal").modal();
      }
    })


  }
  savestar(){
    var star=$("#starvalue").val();
    this.driverService.driverStarUpdate(this.driverId,parseInt(star) ).subscribe(ret=>{
      if (ret.code == 0) {
        $("#starEditModal").modal("hide");
      }else{
        alert(ret.msg);
      }
    })
  }
  findPage(page: number) {
    this.driverService.findList(page).subscribe(ret => {
      if (ret.code == 0) {
        this.driverInfoList = ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
      } else {
        alert(ret.msg);
      }
    }, d => {
      console.log(d)
    });
  }



  searchDriverInfoList() {
    this.pageNum = 1;
    this.listDriverInfo();
  }

  listDriverInfo() {
    this.driverInfoQCForm.get("pageNum").setValue(this.pageNum);
    this.driverInfoQCForm.get("pageSize").setValue(this.pageSize);
    this.driverService.listDriverInfo(this.driverInfoQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.driverInfoList = result.data.list;
    });
  }

  chooseAuthed() {
    this.driverInfoQCForm.get("authed").setValue($("#authed").val());
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listDriverInfo();
  }

}
