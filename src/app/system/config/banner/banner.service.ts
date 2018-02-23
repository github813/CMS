import {Injectable} from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Api} from "../../../common/api";
import {Observable} from "rxjs/Observable";

@Injectable()
export class BannerService {
  public static actionList: Array<BannerAction> = [{action: "openUrl", description: "打开URL"}];

  constructor(private ajx: Ajax) {
  }

  listBanner(type: string): Observable<any> {
    return this.ajx.getByParams(Api.LIST_BANNER, {type: type});
  }

  updateBanner(banner: Banner): Observable<any> {
    return this.ajx.put(Api.UPDATE_BANNER, banner);
  }

  saveBanner(banner: Banner): Observable<any> {
    return this.ajx.post(Api.SAVE_BANNER, banner);
  }

  deleteBanner(id: number): Observable<any> {
    return this.ajx.deleteByParams(Api.DELETE_BANNER, {id: id});
  }

  uploadFile(fileList: FileList, type: string): Observable<any> {
    let formData: FormData = new FormData();
    let i = 0;
    for (i; i < fileList.length; ++i) {
      formData.append('fileList', fileList.item(i), fileList.item(i).name);
    }
    formData.append('type', type);
    return this.ajx.post(Api.UPLOAD_FILE, formData);
  }


}

export class Banner {
  public id: number;
  public orderNum: number;
  public image: string;
  public action: string;
  public url: string;
  public customField: string;
  public startTime: string;
  public endTime: string;
  public createTime: string;
  public modifiedTime: string;
}

export class BannerAction {
  public action: string;
  public description: string;
}
