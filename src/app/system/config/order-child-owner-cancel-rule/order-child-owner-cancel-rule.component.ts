import {Component, OnInit} from '@angular/core';
import {OrderChildOwnerCancelRule, OrderChildOwnerCancelRuleService} from "./order-child-owner-cancel-rule.service";
import {Result} from "../../../common/dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {intValidator} from "../../../common/comm-validator";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-order-child-owner-cancel-rule',
  templateUrl: './order-child-owner-cancel-rule.component.html',
  styleUrls: ['./order-child-owner-cancel-rule.component.css']
})
export class OrderChildOwnerCancelRuleComponent implements OnInit {
// 规则表
  orderChildOwnerCancelRuleList: Array<OrderChildOwnerCancelRule> = new Array;
  // 弹出框的提示信息
  warningMsg: String;
  // 请求结果
  result: Result;
  // 是否显示结果弹出框
  resultMsgStatus: boolean;
  // 将要删除的记录id
  id: number;

  orderChildOwnerCancelRuleForm: FormGroup;

  //form表单的操作 "create"表示新建，“update"表示更新
  formOperation: string;

  constructor(formBuilder: FormBuilder, private orderChildOwnerCancelRuleService: OrderChildOwnerCancelRuleService) {
    this.orderChildOwnerCancelRuleForm = formBuilder.group({
      id: [''],
      time: ['', [Validators.min(1), intValidator]],
      compensationFee: ['', [Validators.min(1), intValidator]],
      modifiedTime: ['']
    });
  }

  ngOnInit() {
    this.orderChildOwnerCancelRuleService.listOrderChildOwnerCancelRule().catch(error => Observable.throw(error))
      .subscribe(
        (result) => this.orderChildOwnerCancelRuleList = result.data,
        error => this.popInitResult(null, {code: -1, msg: '系统错误', data: 'null'})
      );
  }

  setConfirmResult(confirmResult: boolean) {
    if (confirmResult == true) {
      this.warningMsg = null;
      this.orderChildOwnerCancelRuleService.deleteOrderChildCancelRule(this.id).catch(error => Observable.throw(error))
        .subscribe(
          (result) => this.popResult("删除成功", result),
          error => this.popInitResult(null, {code: -1, msg: '系统错误', data: 'null'})
        );
      this.id = null;
    }
    if (confirmResult == false) {
      this.warningMsg = null;
      this.id = null;
    }
  }

  deleteOrderChildOwnerCancelRule(id: number) {
    this.warningMsg = "确定删除这条规则吗？";
    this.id = id;
  }

  update(orderChildOwnerCancelRule: OrderChildOwnerCancelRule) {
    this.orderChildOwnerCancelRuleForm.get("id").setValue(orderChildOwnerCancelRule.id);
    this.orderChildOwnerCancelRuleForm.get("time").setValue(orderChildOwnerCancelRule.time);
    this.orderChildOwnerCancelRuleForm.get("compensationFee").setValue(orderChildOwnerCancelRule.compensationFee);
    this.orderChildOwnerCancelRuleForm.get("modifiedTime").setValue(orderChildOwnerCancelRule.modifiedTime);
    this.showForm("update");
  }


  submit() {
    if (this.formOperation == "create") {
      this.orderChildOwnerCancelRuleService.saveOrderChildOwnerCancelRule(this.orderChildOwnerCancelRuleForm.value)
        .catch(error => Observable.throw(error)).subscribe(
        (result) => this.popResult("添加成功", result),
        error => this.popInitResult(null, {code: -1, msg: '系统错误', data: 'null'})
      );
      this.orderChildOwnerCancelRuleForm.reset();
      this.formOperation = null;
    }
    if (this.formOperation == "update") {
      this.orderChildOwnerCancelRuleService.updateOrderChildOwnerCancelRule(this.orderChildOwnerCancelRuleForm.value)
        .catch(error => Observable.throw(error)).subscribe(
        (result) => this.popResult("修改成功", result),
        error => this.popInitResult(null, {code: -1, msg: '系统错误', data: 'null'})
      );
      this.orderChildOwnerCancelRuleForm.reset();
      this.formOperation = null;
    }
  }

  showForm(operation: string) {
    this.formOperation = operation;
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

  popInitResult(successMsg: string, result: Result) {
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
