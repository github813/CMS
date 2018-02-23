import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  BusinessNotifyListComponent,
} from "./bussiness-notify/bussiness-notify-list/business-notify-list.component";
import {SystemNotifyListComponent} from "./system-notify/system-notify-list/system-notify-list.component";
import {HttpModule} from "@angular/http";
import {ReactiveFormsModule} from "@angular/forms";
import {ComponentModule} from "../component/component.module";
import {RouterModule} from "@angular/router";
import {MessageRoutes} from "./message.routes";
import {MessageService} from "./message.service";
import {Api} from "../common/api";
import {SystemNotifyFormComponent} from './system-notify/system-notify-form/system-notify-form.component';
import {BlackListComponent} from './black-list/black-list.component';
import {WhiteListComponent} from './white-list/white-list.component';
import {
  SmsTemplateListComponent
} from './sms-template/sms-template-list/sms-template-list.component';
import {SmsTemplateFormComponent} from './sms-template/sms-template-form/sms-template-form.component';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    ReactiveFormsModule,
    ComponentModule,
    RouterModule.forChild(MessageRoutes)
  ],
  declarations: [BusinessNotifyListComponent, SystemNotifyListComponent,
    SystemNotifyFormComponent, BlackListComponent, WhiteListComponent,
    SmsTemplateListComponent, SmsTemplateFormComponent],
  providers: [MessageService, Api],
  bootstrap: [SystemNotifyListComponent]
})
export class MessageModule {
}
