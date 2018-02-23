import { Component, OnInit } from '@angular/core';
import {RateDirverService, RateDriver} from "./rate-dirver.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-rate-driver',
  templateUrl: './rate-driver.component.html',
  styleUrls: ['./rate-driver.component.css']
})
export class RateDriverComponent implements OnInit {
  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;

  rateDriverList: Array<RateDriver> = new Array;

  rateDriverQC: FormGroup;

  constructor(private rateDriverService:RateDirverService,private router:Router,private formBuilder: FormBuilder,public appService:AppService) {
    this.rateDriverQC = formBuilder.group({
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.listRateDrivers();
  }

  listRateDrivers() {
    this.rateDriverQC.get("pageNum").setValue(this.pageNum);
    this.rateDriverQC.get("pageSize").setValue(this.pageSize);
    this.rateDriverService.listRateDirver(this.rateDriverQC.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.rateDriverList = result.data.list;
    });
  }

  create(){
    this.router.navigateByUrl("/user/rate/rate-driver/driver-form/new");
  }

  update(id:number){
    this.router.navigateByUrl("/user/rate/rate-driver/driver-form/"+id);
  }
}
