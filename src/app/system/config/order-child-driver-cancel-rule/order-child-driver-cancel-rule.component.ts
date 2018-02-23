import {Component, OnInit} from '@angular/core';
import {
  OrderChildDriverCancelRule,
  OrderChildDriverCancelRuleService
} from "./order-child-driver-cancel-rule.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Result} from "../../../common/dto";
import {Observable} from "rxjs/Observable";
import {intValidator} from "../../../common/comm-validator";

@Component({
  selector: 'app-order-child-driver-cancel-rule',
  templateUrl: './order-child-driver-cancel-rule.component.html',
  styleUrls: ['./order-child-driver-cancel-rule.component.css']
})
export class OrderChildDriverCancelRuleComponent implements OnInit {
  // 规则表
  orderChildDriverCancelRuleList: Array<OrderChildDriverCancelRule> = new Array;
  // 弹出框的提示信息
  warningMsg: String;
  // 请求结果
  result: Result;
  // 是否显示结果弹出框
  resultMsgStatus: boolean;
  // 将要删除的记录id
  id: number;

  orderChildDriverCancelRuleForm: FormGroup;

  //form表单的操作
  formOperation: string;

  constructor(formBuilder: FormBuilder, private orderChildDriverCancelRuleService: OrderChildDriverCancelRuleService) {
    this.orderChildDriverCancelRuleForm = formBuilder.group({
      id: [''],
      time: ['', [ Validators.min(1), intValidator]],
      compensationFee: ['', [ Validators.min(1), intValidator]],
      modifiedTime: ['']
    });
  }

  ngOnInit() {
    this.orderChildDriverCancelRuleService.listOrderChildDriverCancelRule().catch(error => Observable.throw(error))
      .subscribe(
        (result) => this.orderChildDriverCancelRuleList = result.data,
        error => this.popInitResult(null, {code: -1, msg: '系统错误', data: 'null'})
      );
  }

  setConfirmResult(confirmResult: boolean) {
    if (confirmResult == true) {
      this.warningMsg = null;
      this.orderChildDriverCancelRuleService.deleteOrderChildCancelRule(this.id).catch(error => Observable.throw(error))
        .subscribe(
          (result) => this.popResult("删除成功", result),
          error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
        );
      this.id = null;
    }
    if (confirmResult == false) {
      this.warningMsg = null;
      this.id = null;
    }
  }

  deleteOrderChildDriverCancelRule(id: number) {
    this.warningMsg = "确定删除这条规则吗？";
    this.id = id;
  }

  update(orderChildDriverCancelRule: OrderChildDriverCancelRule) {
    this.orderChildDriverCancelRuleForm.get("id").setValue(orderChildDriverCancelRule.id);
    this.orderChildDriverCancelRuleForm.get("time").setValue(orderChildDriverCancelRule.time);
    this.orderChildDriverCancelRuleForm.get("compensationFee").setValue(orderChildDriverCancelRule.compensationFee);
    this.orderChildDriverCancelRuleForm.get("modifiedTime").setValue(orderChildDriverCancelRule.modifiedTime);
    this.showForm("update");
  }


  submit() {
    if (this.formOperation == "create") {
      this.orderChildDriverCancelRuleService.saveOrderChildDriverCancelRule(this.orderChildDriverCancelRuleForm.value)
        .catch(error => Observable.throw(error)).subscribe(
        (result) => this.popResult("添加成功", result),
        error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
      );
      this.orderChildDriverCancelRuleForm.reset();
      this.formOperation = null;
    }
    if (this.formOperation == "update") {
      this.orderChildDriverCancelRuleService.updateOrderChildDriverCancelRule(this.orderChildDriverCancelRuleForm.value)
        .catch(error => Observable.throw(error)).subscribe(
        (result) => this.popResult("修改成功", result),
        error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
      );
      this.orderChildDriverCancelRuleForm.reset();
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
