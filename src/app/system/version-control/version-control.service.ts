import { Injectable } from '@angular/core';
import {Ajax} from "../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../common/api";

@Injectable()
export class VersionControlService {
  constructor(private ajax: Ajax) {
  }

  listVersionControl(versionControlQC:VersionControlQC): Observable<any> {
    return this.ajax.getByParams(Api.listVersionControl,VersionControlQC);
  }

  saveVersionControl(versionControl: VersionControl): Observable<any> {
    return this.ajax.post(Api.saveVersionControl, versionControl);
  }

  updateVersionControl(systemVersionControlDTO): Observable<any> {
    console.log(systemVersionControlDTO);
    return this.ajax.post(Api.updateVersionControl, systemVersionControlDTO);
  }

  getVersionControlById(id: number): Observable<any> {
    let params = {"id":id};
    return this.ajax.getByParams(Api.getSystemVersionById,params);
  }

}

export class VersionControl {
  public id: number;
  public versionContent: string;//版本描述
  public versionName: string;//版本名称
  public versionPath: string;//版本路径
  public versionType: number;//版本类型
  public versionNumber: number;//版本号
  public versionStatus: number;//版本状态
  public versionTime: string;//版本生效时间
  public versionForce: number;//版本是否强制更新
}

export class VersionControlQC {
  constructor(pageNum,
              pageSize) {
  }
}
