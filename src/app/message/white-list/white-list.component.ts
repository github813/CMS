import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {WhiteMobile, MessageService} from "../message.service";
import {Result} from "../../common/dto";
import {Page} from "../../component/pagination/pagination.component";
import {Router} from "@angular/router";
import {mobileValidator} from "../../common/comm-validator";
declare var $;
@Component({
  selector: 'app-white-list',
  templateUrl: './white-list.component.html',
  styleUrls: ['./white-list.component.css']
})
export class WhiteListComponent implements OnInit {

  pageNum: number = 1;
  pageSize: number = 10;
  totalNum: number;
  totalPages: number;

  mobile: string;


  whiteListQCForm: FormGroup;
  whiteMobileAddForm: FormGroup;
  whiteMobileList: Array<WhiteMobile>;

  // 弹出框的提示信息
  warningMsg: String;
  // 请求结果
  result: Result;
  // 是否显示结果弹出框
  resultMsgStatus: boolean;

  operation: string;

  changePageNum(page: Page) {
    this.pageNum = page.pageNum;
    this.pageSize = page.pageSize;
    this.listWhiteMobileList();
  }

  setConfirmResult(confirmResult: boolean) {
    this.warningMsg = null;
    if (confirmResult == true) {
      if (this.operation == "delete") {
        this.messageService.deleteWhiteMobile(this.mobile)
          .subscribe((result) => this.popResult("删除成功", result));
        this.mobile = null;
        this.listWhiteMobileList();
      }
      if (this.operation == "create") {
        this.messageService.saveWhiteMobile(this.whiteMobileAddForm.get("mobile").value)
          .subscribe((result) => this.popResult("添加成功", result));
        this.whiteMobileAddForm.reset({"mobile": null});
      }
    }
    if (confirmResult == false) {
      this.mobile = null;
    }
  }


  constructor(formBuilder: FormBuilder, private messageService: MessageService, private router: Router) {
    this.whiteListQCForm = formBuilder.group({
      mobile: ['', mobileValidator]
    });
    this.whiteMobileAddForm = formBuilder.group({
      mobile: ['', mobileValidator]
    });
  }


  listWhiteMobileList() {
    this.messageService.listWhiteMobileList(
      this.whiteListQCForm.get("mobile").value,
      this.pageNum, this.pageSize)
      .subscribe((result) => {
          if (result.code == 0) {
            this.whiteMobileList = result.data.list;
            this.pageNum = result.data.pageNum;
            this.totalNum = result.data.total;
            this.pageSize = result.data.pageSize;
            this.totalPages = result.data.pages;
          } else {
            this.popResult(null, result);
          }
        }
      );
  }

  saveWhiteMobile() {
    this.operation = "create";
    this.warningMsg = "确定将手机号" + this.whiteMobileAddForm.get("mobile").value + "加入白名单吗？";
  }


  ngOnInit() {
    this.listWhiteMobileList();
  }

  popResult(successMsg: string, result: Result) {
    if (result.code == 0) {
      result.msg = successMsg;
    }
    this.result = result;
    this.resultMsgStatus = true;
    setTimeout(() => {
      this.resultMsgStatus = false;
    }, 2000);
  }

  deleteWhiteMobile(mobile: string) {
    this.operation = "delete";
    this.mobile = mobile;
    this.warningMsg = "确定将手机号" + this.mobile + "移出白名单吗？";
  }


}
