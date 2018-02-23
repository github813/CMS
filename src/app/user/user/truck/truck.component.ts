import {Component, OnInit} from '@angular/core';
import {TruckInfo, TruckService} from "./truck.service";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Page} from "../../../component/pagination/pagination.component";
declare var $: any;

@Component({
  selector: 'app-truck',
  templateUrl: './truck.component.html',
  styleUrls: ['./truck.component.css']
})
export class TruckComponent implements OnInit {
  pageNum: number;
  pageSize: number = 10;
  totalNum: number = 0;
  totalPages: number;

  truckInfoList: TruckInfo[];

  truckInfoQCForm: FormGroup;

  constructor(public truckService: TruckService, private router: Router, private formBuilder: FormBuilder) {
    this.truckInfoQCForm = formBuilder.group({
      owner: [''],
      mobile: [''],
      status: ['k'],
      truckStatus: [''],
      truckNo: [''],
      model: [''],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.findPage(1);
  }

  showTruckDetail(id: number) {
    this.router.navigateByUrl("/user/user/truck/truck-detail/" + id);
  }

  findPage(page: number) {
    this.truckService.findList(page).subscribe(ret => {
      if (ret.code == 0) {
        this.truckInfoList = ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
      } else {
        alert(ret.msg);
      }
    });
  }

  searchTruckInfoList() {
    this.pageNum = 1;
    this.listTruckInfo();
  }

  /**
   * 导出车辆信息到excel
   */
  exportToExcel() {
    var link = document.createElement("a");
    this.truckService.exportTruckToExcel().subscribe(data => {
        link.setAttribute("href", window.URL.createObjectURL(data));
        link.setAttribute("download", "车辆列表" + Date.now() + ".xls");
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    );
  }

  listTruckInfo() {
    this.truckInfoQCForm.get("pageNum").setValue(this.pageNum);
    this.truckInfoQCForm.get("pageSize").setValue(this.pageSize);

    if(this.truckInfoQCForm.value.status=="k"){
      this.truckInfoQCForm.value.status='';
    }
    this.truckService.listTruckInfo(this.truckInfoQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.truckInfoList = result.data.list;
    });
  }

  chooseTruckStatus() {
    this.truckInfoQCForm.get("truckStatus").setValue($("#truckStatus").val());
  }

  chooseStatus() {
    this.truckInfoQCForm.get("status").setValue($("#status").val());
  }

  chooseModel() {
    this.truckInfoQCForm.get("model").setValue($("#model").val());
  }

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listTruckInfo();
  }

}
