/**
 * Created by xujianke on 2017/6/14.
 */

import {Http, Jsonp, URLSearchParams, Headers, ResponseContentType, Response} from '@angular/http';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import {Injectable} from "@angular/core";
import {SessionStorage} from "./session_storage";
import {Router} from "@angular/router";
import {Result} from "./dto";

@Injectable()
export class Ajax {
  constructor(public http: Http, public router: Router) {
  }

  public makeHeaders(): Headers {
    let headers: Headers;
    headers = new Headers();
    let user: any = SessionStorage.getUser();
    headers.append("userId", user.userId);
    headers.append("accessToken", user.accessToken);
    return headers;
  }

  //get
  public get(url: string): Observable<Result> {
    return this.http.get(url, {headers: this.makeHeaders()})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  public getByParams(url: string, params): Observable<Result> {
    return this.http.get(url, {headers: this.makeHeaders(), params: params})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  public getBlob(url: string, params): any {
    return this.http.get(url, {
      headers: this.makeHeaders(),
      params: params,
      responseType: ResponseContentType.Blob
    }).map((res: Response) => new Blob([res.blob()], {type: 'application/octet-stream'}));
  }

  //post
  public post(url: string, params): Observable<Result> {
    return this.http.post(url, params, {headers: this.makeHeaders()})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  //put
  public put(url: string, params): Observable<Result> {
    return this.http.put(url, params, {headers: this.makeHeaders()})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  //delete
  public delete(url: string): Observable<Result> {
    return this.http.delete(url, {headers: this.makeHeaders()})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  public deleteByParams(url: string, params): Observable<Result> {
    return this.http.delete(url, {headers: this.makeHeaders(), params: params})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  //get
  public getByHeaders(url: string, headers: Headers): Observable<Result> {
    return this.http.get(url, {headers: headers})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  //post
  public postByHeaders(url: string, params, headers: Headers): Observable<Result> {
    return this.http.post(url, params, {headers: headers})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  //put
  public putByHeaders(url: string, params, headers: Headers): Observable<Result> {
    return this.http.put(url, params, {headers: headers})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  //delete
  public deleteByHeaders(url: string, headers: Headers): Observable<Result> {
    return this.http.delete(url, {headers: headers})
      .map((res: Response) => res.json()).filter(this.checkLogin.bind(this));
  }

  public checkLogin(ret: Result) {
    if (ret.code == 100) {

      this.router.navigateByUrl("/login");
    }
    return true;
  }
}
