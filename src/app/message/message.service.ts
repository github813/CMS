import {Injectable} from '@angular/core';
import {Observable} from "rxjs/Observable";
import {Ajax} from "../common/ajax";
import {Api} from "../common/api";

@Injectable()
export class MessageService {

  constructor(private ajax: Ajax, api: Api) {
  }

  //系统消息列表
  listSystemMessageList(systemMessageQC: SystemMessageQC): Observable<any> {
    return this.ajax.getByParams(Api.LIST_SYSTEM_MESSAGE, systemMessageQC);
  }
  //保存系统消息
  saveSystemMessageList(systemMessage: SystemMessage): Observable<any> {
    return this.ajax.post(Api.SAVE_SYSTEM_MESSAGE, systemMessage);
  }
  //修改系统消息
  updateSystemMessage(systemMessage: SystemMessage): Observable<any> {
    return this.ajax.put(Api.UPDATE_SYSTEM_MESSAGE, systemMessage);
  }


  //黑名单列表
  listBlackMobileList(mobile: string, pageNum: number, pageSize: number) {
    return this.ajax.getByParams(Api.LIST_BLACK_MOBILE, {mobile: mobile, pageNum: pageNum, pageSize: pageSize});
  }

  //保存到黑名单
  saveBlackMobile(mobile: string): Observable<any> {
    const formdata: FormData = new FormData();
    formdata.append("mobile", mobile);
    return this.ajax.post(Api.SAVE_BLACK_MOBILE, formdata);
  }
  //从黑名单删除
  deleteBlackMobile(mobile: string) {
    return this.ajax.deleteByParams(Api.DELETE_BLACK_MOBILE, {mobile: mobile});
  }

  //白名单列表
  listWhiteMobileList(mobile: string, pageNum: number, pageSize: number) {
    return this.ajax.getByParams(Api.LIST_WHITE_MOBILE, {mobile: mobile, pageNum: pageNum, pageSize: pageSize});
  }

  //添加到白名单
  saveWhiteMobile(mobile: string): Observable<any> {
    const formData: FormData = new FormData();
    formData.append("mobile", mobile);
    return this.ajax.post(Api.SAVE_WHITE_MOBILE, formData);
  }

  //从白名单删除
  deleteWhiteMobile(mobile: string) {
    return this.ajax.deleteByParams(Api.DELETE_WHITE_MOBILE, {mobile: mobile});
  }

  //短信模板列表
  listSmsTemplateList(smsTemplateQC: SmsTemplateQC) {
    return this.ajax.getByParams(Api.LIST_SMS_TEMPLATE, smsTemplateQC);
  }
  //保存短信模板
  saveSmsTemplate(smsTemplate: SmsTemplate) {
    return this.ajax.post(Api.SAVE_SMS_TEMPLATE, smsTemplate);
  }
  //修改短信模板
  updateSmsTemplate(smsTemplate: SmsTemplate) {
    return this.ajax.put(Api.UPDATE_SMS_TEMPLATE, smsTemplate);
  }
  //删除短信模板
  deleteSmsTemplate(type: string) {
    return this.ajax.deleteByParams(Api.DELETE_SMS_TEMPLATE, {type: type});
  }

}

export class SystemMessage {
  public id: number;

  public sender: number;

  public receiver: number;

  public receiverRole: string;

  public title: string;

  public content: string;

  public orderNo: string;

  public type: number;

  public createTime: string;

  public modifiedTime: string;
}

export class SystemMessageQC {
  public id: number;

  public receiver: number;

  public receiverRole: string;

  public title: string;

  public content: string;

  public orderNo: string;

  public type: number;

  public fromCreateTime: string;

  public toCreateTime: string;

  public pageNum: number;

  public pageSize: number;
}


export class BlackMobile {
  public id: number;
  public mobile: string;
  public createTime: string;
  public modifiedTime: string;
}
export class WhiteMobile {
  public id: number;
  public mobile: string;
  public createTime: string;
  public modifiedTime: string;
}

export class SmsTemplate {
  public id: number;

  public type: string;

  public templateCode: string;

  public description: string;

  public content: string;

  public createTime: string;

  public modifiedTime: string;
}

export class SmsTemplateQC {
  public type: string;

  public templateCode: string;

  public description: string;
}
