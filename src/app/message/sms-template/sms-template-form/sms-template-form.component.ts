import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService, SmsTemplate} from "../../message.service";
import {ActivatedRoute, Params, Route, Router} from "@angular/router";
import {Result} from "../../../common/dto";

@Component({
  selector: 'app-sms-template-form',
  templateUrl: './sms-template-form.component.html',
  styleUrls: ['./sms-template-form.component.css']
})
export class SmsTemplateFormComponent implements OnInit {
  smsTemplate: SmsTemplate = new SmsTemplate;
  smsTemplateForm: FormGroup;

  result: Result;
  resultMsgStatus: boolean;

  constructor(private formBuilder: FormBuilder, private routeInfo: ActivatedRoute, private messageService: MessageService, private router: Router) {
    this.smsTemplateForm = formBuilder.group({
      id: [''],
      type: ['', Validators.required],
      templateCode: ['', Validators.required],
      description: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      let smsTemplate: string = params["smsTemplate"];
      if (smsTemplate != null && smsTemplate != '') {
        Object.assign(this.smsTemplate, JSON.parse(params["smsTemplate"]));
        this.smsTemplateForm.get("id").setValue(this.smsTemplate.id);
        this.smsTemplateForm.get("type").setValue(this.smsTemplate.type);
        this.smsTemplateForm.get("templateCode").setValue(this.smsTemplate.templateCode);
        this.smsTemplateForm.get("description").setValue(this.smsTemplate.description);
        this.smsTemplateForm.get("content").setValue(this.smsTemplate.content);

      }
    })

  }

  submitSmsTemplate() {
    if (this.smsTemplateForm.get("id").value == null || this.smsTemplateForm.get("id").value == '') {
      this.messageService.saveSmsTemplate(this.smsTemplateForm.value).subscribe((result) => {
        this.popResult("添加成功", result);
      })
    } else {
      this.messageService.updateSmsTemplate(this.smsTemplateForm.value).subscribe((result) => {
        this.popResult("修改成功", result);
      })
    }
  }

  popResult(successMsg: string, result: Result) {
    if (result.code == 0) {
      result.msg = successMsg;
    }
    this.result = result;
    this.resultMsgStatus = true;
    setTimeout(() => {
      this.resultMsgStatus = false;
      setTimeout(() => {
        this.router.navigateByUrl("/message/smsTemplate/list");
      }, 500)
    }, 2000);
  }

}
