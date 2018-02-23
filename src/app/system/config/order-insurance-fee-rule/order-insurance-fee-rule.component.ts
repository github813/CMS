import {Component, OnInit} from '@angular/core';
import {OrderInsuranceFeeRule, OrderInsuranceFeeRuleServiceService} from "./order-insurance-fee-rule-service.service";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../common/dto";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {intValidator} from "../../../common/comm-validator";

@Component({
  selector: 'app-order-insurance-fee-rule',
  templateUrl: './order-insurance-fee-rule.component.html',
  styleUrls: ['./order-insurance-fee-rule.component.css']
})
export class OrderInsuranceFeeRuleComponent implements OnInit {
  result: Result;
  resultMsgStatus: boolean;
  warningMsg: string;
  formOperation: string;
  orderInsuranceFeeRuleForm: FormGroup;
  id: number;

  orderInsuranceFeeRuleList: Array<OrderInsuranceFeeRule>;

  constructor(private orderInsuranceFeeRuleService: OrderInsuranceFeeRuleServiceService, formBuilder: FormBuilder) {
    this.orderInsuranceFeeRuleForm = formBuilder.group({
      id: [''],
      goodsPrice: ['', [Validators.min(0), intValidator]],
      insurancePercent: ['', [Validators.required]],
      modifiedTime: ['']
    });
  }

  ngOnInit() {
    this.orderInsuranceFeeRuleService.listOrderInsuranceFeeRule().catch(error => Observable.throw(error))
      .subscribe(
        result => this.orderInsuranceFeeRuleList = result.data,
        error => this.popInitResult(null, {code: -1, msg: '系统错误', data: 'null'})
      );
  }

  setConfirmResult(confirmResult: boolean) {
    if (confirmResult) {
      if (this.formOperation == "create") {
        this.orderInsuranceFeeRuleService.saveOrderInsuranceFeeRule(this.orderInsuranceFeeRuleForm.value)
          .catch(error => Observable.throw(error))
          .subscribe(
            result => this.popResult("添加成功", result),
            error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
          );
        this.orderInsuranceFeeRuleForm.reset({});
      }

      if (this.formOperation == "delete") {
        this.orderInsuranceFeeRuleService.deleteOrderInsuranceFeeRule(this.id)
          .catch(error => Observable.throw(error))
          .subscribe(
            result => this.popResult("删除成功", result),
            error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
          )
      }

      if (this.formOperation == "update") {
        this.orderInsuranceFeeRuleService.updateOrderInsuranceFeeRule(this.orderInsuranceFeeRuleForm.value)
          .catch(error => Observable.throw(error))
          .subscribe(
            result => this.popResult("修改成功", result),
            error => this.popResult(null, {code: -1, msg: '系统错误', data: 'null'})
          )
      }

    }
  }

  submit() {
    if (this.formOperation == "create") {
      this.warningMsg = "确定添加一条保险金规则吗？";
    }

    if (this.formOperation == "update") {
      this.warningMsg = "确定保存修改吗？";
    }

  }

  //删除
  deleteOrderInsuranceFeeRule(orderInsuranceFeeRule: OrderInsuranceFeeRule) {
    this.formOperation = "delete";
    this.warningMsg = "确定删除货物价值为" + orderInsuranceFeeRule.goodsPrice + "（元/吨）的保险金规则吗？";
    this.id = orderInsuranceFeeRule.id;
  }

  showForm(operation: string) {
    this.formOperation = operation;
  }

  //更新
  update(orderInsuranceFeeRule: OrderInsuranceFeeRule) {
    this.orderInsuranceFeeRuleForm.get("id").setValue(orderInsuranceFeeRule.id);
    this.orderInsuranceFeeRuleForm.get("goodsPrice").setValue(orderInsuranceFeeRule.goodsPrice);
    this.orderInsuranceFeeRuleForm.get("insurancePercent").setValue(orderInsuranceFeeRule.insurancePercent);
    this.orderInsuranceFeeRuleForm.get("modifiedTime").setValue(orderInsuranceFeeRule.modifiedTime);
    this.formOperation = "update";
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
