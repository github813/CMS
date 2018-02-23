import { Component, OnInit } from '@angular/core';
import {VersionControl, VersionControlService} from "./version-control.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-version-control',
  templateUrl: './version-control.component.html',
  styleUrls: ['./version-control.component.css']
})
export class VersionControlComponent implements OnInit {

  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;

  versionControlList: Array<VersionControl> = new Array;

  versionControlQCForm: FormGroup;

  // 将要删除的记录id
  id: number;

  loading:boolean = false;

  constructor(private versionControlService:VersionControlService,private router:Router,private formBuilder: FormBuilder,public appService:AppService) {
    this.versionControlQCForm = formBuilder.group({
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.listVersionControl();
  }

  listVersionControl() {
    this.versionControlQCForm.get("pageNum").setValue(this.pageNum);
    this.versionControlQCForm.get("pageSize").setValue(this.pageSize);
    this.versionControlService.listVersionControl(this.versionControlQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.versionControlList = result.data.list;
    });
  }

  create(){
    this.router.navigateByUrl("/system/version-control/version-control-form/new");
  }
  update(id:number){
    this.router.navigateByUrl("/system/version-control/version-control-form/"+id);
  }

}
