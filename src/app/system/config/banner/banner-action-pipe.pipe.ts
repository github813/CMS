import {Pipe, PipeTransform} from '@angular/core';
import {BannerAction, BannerService} from "./banner.service";

@Pipe({
  name: 'bannerActionPipe'
})
export class BannerActionPipePipe implements PipeTransform {
  actionList: Array<BannerAction> = BannerService.actionList;

  transform(value: any, args?: any): any {
    return this.actionList.find((action) => {
      if (action.action == value) {
        return true;
      }
    }).description;
  }

}
