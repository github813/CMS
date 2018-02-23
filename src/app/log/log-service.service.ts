import {Injectable} from '@angular/core';
import {Ajax} from "../common/ajax";
import {Api} from "../common/api";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LogServiceService {

  constructor(public ajax: Ajax) {
  }

  listLog(clxLogQC: ClxLogQC): Observable<any> {
    return this.ajax.getByParams(Api.LIST_LOG, clxLogQC);
  }

}

export class ClxLog {
  public _id: string;
  public serviceName: string;
  public time: string;
  public level: string;
  public threadName: string;
  public msg: string;
  public e: ClxException;
}

export class ClxException {
  public _class: string;
  public detailMessage: string;
  public stackTrace: Array<StackTraceElement>;
}


export class StackTraceElement {
  public declaringClass: string;
  public methodName: string;
  public fileName: string;
  public lineNumber: string;
}

export class ClxLogQC {
  public level: string;
  public threadName: string;
  public msg: string;
  public exceptionClass: string;
  public fromTime: string;
  public toTime: string;
  public pageNum: number;
  public pageSize: number;
}


