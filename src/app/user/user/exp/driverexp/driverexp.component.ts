import { Component, OnInit } from '@angular/core';
import {ExpService,DriverInfo} from "../exp.service";
import {Router,NavigationEnd} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../../component/pagination/pagination.component";
import {SessionStorage} from "../../../../common/session_storage";

declare var $: any;
@Component({
  selector: 'app-driverexp',
  templateUrl: './driverexp.component.html',
  styleUrls: ['./driverexp.component.css']
})
export class DriverexpComponent implements OnInit {

  pageNum: number=1;
  pageSize: number = 10;
  totalNum: number = 0;
  totalPages: number;

  driverInfoList: DriverInfo[];

  driverInfoQCForm: FormGroup;

  constructor(public expService: ExpService, private router: Router, private formBuilder: FormBuilder) {
    this.driverInfoQCForm = formBuilder.group({
      name: [''],
      mobile: [''],
      star: [''],
      gradeno: [''],
      pageNum: ['1'],
      pageSize: ['10'],
      usertype:['driver']
    });
  }

  ngOnInit() {
    let param:any = this.expService.findParam;
    if(param){
      if(param.usertype=="driver"){
        this.driverInfoQCForm.get("name").setValue(param.name);
        this.driverInfoQCForm.get("mobile").setValue(param.mobile);
        this.driverInfoQCForm.get("star").setValue(param.star);
        this.driverInfoQCForm.get("pageNum").setValue(param.pageNum);
      }
    }else{
      this.driverInfoQCForm.get("pageNum").setValue("1");
    }
    let self=this;
    setTimeout(function () {
      $("#star").val(self.driverInfoQCForm.get("star").value);
    },100)
    this.findPage();
  }

  showUserDetail(id: number) {
    this.router.navigateByUrl("/user/user/driver/user-detail/" + id);
  }

  findPage() {
    this.expService.driverInfoquery(this.driverInfoQCForm.value).subscribe(ret => {
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

  //导出到excel
  exportToExcel() {
    // var link = document.createElement("a");
    // this.driverService.exportDriverUserToExcel().subscribe(data => {
    //     link.setAttribute("href", window.URL.createObjectURL(data));
    //     link.setAttribute("download", "司机列表" + Date.now() + ".xls");
    //     link.style.visibility = "hidden";
    //     document.body.appendChild(link);
    //     link.click();
    //     document.body.removeChild(link);
    //   }
    // );
  }

  searchDriverInfoList() {
    this.driverInfoQCForm.get("pageNum").setValue(1);
    this.findPage();
  }

  chooseStar() {
    this.driverInfoQCForm.get("star").setValue($("#star").val());
  }

  changePageNum(page: Page) {
    this.pageNum= page.pageNum;
    this.pageSize = page.pageSize;
    this.driverInfoQCForm.get("pageNum").setValue(page.pageNum);
    this.driverInfoQCForm.get("pageSize").setValue( page.pageSize);
    this.findPage();
  }
  driverAddexp(i:number,type:string){
    let driver= this.driverInfoList[i];
    let id=driver.userId;
    SessionStorage.setObject("userinfo",driver);
    this.router.navigateByUrl("/user/user/exp/driversaveexp/driver/"+type+"/"+id);
  }
  showdriverexp(i:number){
    let driver= this.driverInfoList[i];
    let id=driver.userId;
    SessionStorage.setObject("userinfo",driver);
    this.router.navigateByUrl("/user/user/exp/exploglist/driver/"+id)
  }
}
