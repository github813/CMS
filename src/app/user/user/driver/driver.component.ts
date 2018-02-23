import {Component, OnInit} from '@angular/core';
import {DriverInfo, DriverService} from "./driver.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../component/pagination/pagination.component";
declare var $: any;

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {
  pageNum: number;
  pageSize: number = 10;
  totalNum: number = 0;
  totalPages: number;

  driverInfoList: DriverInfo[];

  driverInfoQCForm: FormGroup;

  constructor(public driverService: DriverService, private router: Router, private formBuilder: FormBuilder) {
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
    this.findPage(1);
  }

  showUserDetail(id: number) {
    this.router.navigateByUrl("/user/user/driver/user-detail/" + id);
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

  //导出到excel
  exportToExcel() {
    var link = document.createElement("a");
    this.driverService.exportDriverUserToExcel().subscribe(data => {
        link.setAttribute("href", window.URL.createObjectURL(data));
        link.setAttribute("download", "司机列表" + Date.now() + ".xls");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    );
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
