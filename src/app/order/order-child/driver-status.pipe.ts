import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'driverStatus'
})
export class DriverStatusPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    switch (value) {
      case 1:
        return "正常";
      case 0:
        return "禁用";
    }

  }
}
