import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateBeautify'
})
export class DateBeautifyPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(!value)return '';
    let str:string;
    if(typeof value === "string"){
      str = value;
    }else{
      str = value.toString();
    }
    let arr = new Array<string>();
    arr.push(str.substr(0,4));
    arr.push('-');
    arr.push(str.substr(4,2));
    arr.push('-');
    arr.push(str.substr(6,2));
    arr.push(' ');
    arr.push(str.substr(8,2));
    arr.push(':');
    arr.push(str.substr(10,2));
    arr.push(':');
    arr.push(str.substr(12,2));
    return arr.join('');
  }

}
