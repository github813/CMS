import {SystemNotifyListComponent} from "./system-notify/system-notify-list/system-notify-list.component";
import {SystemNotifyFormComponent} from "./system-notify/system-notify-form/system-notify-form.component";
import {BusinessNotifyListComponent} from "./bussiness-notify/bussiness-notify-list/business-notify-list.component";
import {BlackListComponent} from "./black-list/black-list.component";
import {WhiteListComponent} from "./white-list/white-list.component";
import {SmsTemplateListComponent} from "./sms-template/sms-template-list/sms-template-list.component";
import {SmsTemplateFormComponent} from "./sms-template/sms-template-form/sms-template-form.component";
/**
 * Created by xujianke on 2017/6/13.
 */
export const MessageRoutes = [
  { path: '', component: SystemNotifyListComponent},
  { path: 'systemNotify', component: SystemNotifyListComponent},
  { path: 'systemNotify/list', component: SystemNotifyListComponent},
  { path: 'systemNotify/form', component: SystemNotifyFormComponent},
  { path: 'systemNotify/form/:id', component: SystemNotifyFormComponent},
  { path: 'bussinessNotify', component: BusinessNotifyListComponent},
  { path: 'bussinessNotify/list', component: BusinessNotifyListComponent},
  { path: 'blackAndWhiteMobile', component: BlackListComponent},
  { path: 'blackAndWhiteMobile/blackList', component: BlackListComponent},
  { path: 'blackAndWhiteMobile/whiteList', component: WhiteListComponent},
  { path: 'smsTemplate', component: SmsTemplateListComponent},
  { path: 'smsTemplate/list', component: SmsTemplateListComponent},
  { path: 'smsTemplate/form', component: SmsTemplateFormComponent},
  { path: 'smsTemplate/form/:type', component: SmsTemplateFormComponent},
];
