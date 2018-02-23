
import { Component, OnInit } from '@angular/core';
import {RateOwnerService, RateOwner} from "./rate-owner.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AppService} from "../../app.service";
@Component({
  selector: 'app-rate-owner',
  templateUrl: './rate-owner.component.html',
  styleUrls: ['./rate-owner.component.css']
})
export class RateOwnerComponent implements OnInit {
  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;

  rateOwnerList: Array<RateOwner> = new Array;

  rateOwnerQC: FormGroup;

  constructor(private rateOwnerService:RateOwnerService,private router:Router,private formBuilder: FormBuilder,public appService:AppService) {
    this.rateOwnerQC = formBuilder.group({
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.listRateOwners();
  }
  listRateOwners() {
    this.rateOwnerQC.get("pageNum").setValue(this.pageNum);
    this.rateOwnerQC.get("pageSize").setValue(this.pageSize);
    this.rateOwnerService.listRateOwner(this.rateOwnerQC.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.rateOwnerList = result.data.list;
    });
  }
  create(){
    this.router.navigateByUrl("/user/rate/rate-owner/owner-form/new");
  }

  update(id:number){
    this.router.navigateByUrl("/user/rate/rate-owner/owner-form/"+id);
  }
}
