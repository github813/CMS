/**
 * Created by xujianke on 2017/6/14.
 */
export class LocalStorage {


  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
  }

  public set(key:string, value:string) {
    localStorage[key] = value;
  }

  public get(key:string):string {
    return localStorage[key] || null;
  }

  public setObject(key:string, value:any):void {
    localStorage[key] = JSON.stringify(value);
  }

  public getObject(key:string):any {
    return JSON.parse(localStorage[key] || '{}');
  }

  public remove(key:string) {
    localStorage.removeItem(key);
  }
  public static getUser(){
    return JSON.parse(localStorage['user'] || '{}');
  }
  public static setUser(value:any) {
    localStorage['user'] = JSON.stringify(value);
  }
}
