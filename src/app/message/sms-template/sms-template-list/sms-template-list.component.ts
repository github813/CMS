import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {MessageService, SmsTemplate} from "../../message.service";
import {Result} from "../../../common/dto";
import {Page} from "../../../component/pagination/pagination.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sms-template',
  templateUrl: './sms-template-list.component.html',
  styleUrls: ['./sms-template-list.component.css']
})
export class SmsTemplateListComponent implements OnInit {
  totalNum: number;
  totalPages: number;

  type: string;


  smsTemplateQCForm: FormGroup;

  smsTemplateList: Array<SmsTemplate>;

  // 弹出框的提示信息
  warningMsg: String;
  // 请求结果
  result: Result;
  // 是否显示结果弹出框
  resultMsgStatus: boolean;


  changePageNum(page: Page) {
    this.smsTemplateQCForm.get("pageNum").setValue(page.pageNum);
    this.smsTemplateQCForm.get("pageSize").setValue(page.pageSize);
    this.listSmsTemplateList();
  }

  setConfirmResult(confirmResult: boolean) {
    this.warningMsg = null;
    if (confirmResult == true) {
      this.messageService.deleteSmsTemplate(this.type)
        .subscribe((result) => this.popResult("删除成功", result));
      this.type = null;
      this.listSmsTemplateList();
    }
    if (confirmResult == false) {
      this.type = null;
    }
  }


  constructor(formBuilder: FormBuilder, private messageService: MessageService, private router: Router) {
    this.smsTemplateQCForm = formBuilder.group({
      type: [''],
      templateCode: [''],
      description: [''],
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  //点击搜索按钮
  searchTemplate() {
    //将页码置为1
    this.smsTemplateQCForm.get("pageNum").setValue(1);
    this.listSmsTemplateList();
  }


  listSmsTemplateList() {
    this.messageService.listSmsTemplateList(this.smsTemplateQCForm.value)
      .subscribe((result) => {
          if (result.code == 0) {
            this.smsTemplateList = result.data.list;
            this.totalNum = result.data.total;
            this.smsTemplateQCForm.get("pageNum").setValue(result.data.pageNum);
            this.smsTemplateQCForm.get("pageSize").setValue(result.data.pageSize);
            this.totalPages = result.data.pages;
          } else {
            this.popResult(null, result);
          }
        }
      );
  }


  deleteSmsTemplate(type: string) {
    console.log(type);
    this.type = type;
    this.warningMsg = "确定删除短信模板: " + type + "吗？";
  }

  toUpdateSmsTemplate(smsTemplate: SmsTemplate) {
    this.router.navigate(["/message/smsTemplate/form/" + smsTemplate.type, {smsTemplate: JSON.stringify(smsTemplate)}]);
  }

  ngOnInit() {
    this.listSmsTemplateList();
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
}
