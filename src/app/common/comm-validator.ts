import {FormControl} from "@angular/forms";
/**
 * Created by xujianke on 2017/6/27.
 */
export function mobileValidator(control:FormControl):any{
  let mobileReg = /^((13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9]|19[0-9])+\d{8})$/;
  let valid = mobileReg.test(control.value);
  return valid ? null : {mobile : "手机号格式错误"};
}

export function intValidator(control:FormControl):any{
  let reg =/^(\d+)$/;
  let valid = reg.test(control.value);
  return valid ? null : {int : "格式错误必须为整数"};
}

export function moneyValidator(control:FormControl):any{
  let reg =/^(-?\d+(.[0-9]{2})?)$/;
  let valid = reg.test(control.value);
  return valid ? null : {money : "格式错整数或者两位小数"};
}

export function idCardValidator(control:FormControl):any{
  let reg =/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
  let valid = reg.test(control.value);
  return valid ? null : {idCard : "格式错"};
}
