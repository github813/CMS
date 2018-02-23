import { Pipe, PipeTransform } from '@angular/core';
import {Dictionary} from "../../common/dictionary";

@Pipe({
  name: 'transform'
})
export class TransformPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(args && Dictionary[args]){
      let map = Dictionary[args];
      if(map[value]){
        return map[value];
      }
    }
    return value;
  }

}
