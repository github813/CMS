import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MessageService, SystemMessage} from "../../message.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Result} from "../../../common/dto";
import {intValidator} from "../../../common/comm-validator";
declare var $;
@Component({
  selector: 'app-system-notify-form',
  templateUrl: './system-notify-form.component.html',
  styleUrls: ['./system-notify-form.component.css']
})
export class SystemNotifyFormComponent implements OnInit {
  systemNotifyForm: FormGroup;
  systemMessage: SystemMessage = new SystemMessage();

  // 请求结果
  result: Result;
  // 是否显示结果弹出框
  resultMsgStatus: boolean;

  constructor(formBuilder: FormBuilder, private messageService: MessageService, private routeInfo: ActivatedRoute, private router: Router) {
    this.systemNotifyForm = formBuilder.group({
      id: [''],
      receiver: ['', [intValidator, Validators.min(1)]],
      receiverRole: ['', Validators.required],
      type: ['-1'],
      title: ['', Validators.required],
      content: ['', Validators.required]
    });
  }

  chooseReceiverRole() {
    this.systemNotifyForm.get("receiverRole").setValue($("#receiverRole").val());
  }


  ngOnInit() {
    this.routeInfo.params.subscribe((params: Params) => {
      let systemMessage: string = params["systemMessage"];
      if (systemMessage != null && systemMessage != '') {
        Object.assign(this.systemMessage, JSON.parse(params["systemMessage"]));
        this.systemNotifyForm.get("id").setValue(this.systemMessage.id);
        this.systemNotifyForm.get("receiver").setValue(this.systemMessage.receiver);
        this.systemNotifyForm.get("receiverRole").setValue(this.systemMessage.receiverRole);
        this.systemNotifyForm.get("title").setValue(this.systemMessage.title);
        this.systemNotifyForm.get("content").setValue(this.systemMessage.content);
      }
    });
  }

  submit() {
    if (this.systemNotifyForm.get("id").value == null || this.systemNotifyForm.get("id").value == '') {
      this.messageService.saveSystemMessageList(this.systemNotifyForm.value).subscribe(
        (result) => {
          this.popResult("消息添加成功", result);
        }
      );
    } else {
      this.messageService.updateSystemMessage(this.systemNotifyForm.value).subscribe((result) => {
        this.popResult("消息修改成功", result);
      })
    }
    this.systemMessage = null;
    this.systemNotifyForm.reset();
  }

  popResult(successMsg: string, result: Result) {
    if (result.code == 0) {
      result.msg = successMsg;
    }
    this.result = result;
    this.resultMsgStatus = true;
    setTimeout(() => {
      this.resultMsgStatus = false;
     // this.ngOnInit();
      setTimeout(() => {this.router.navigateByUrl("/message/systemNotify/list")},
        500)
    }, 2000);
    //this.ngOnInit();
  }

}
