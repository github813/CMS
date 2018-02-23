/**
 * Created by xujianke on 2017/6/19.
 */
export class SessionStorage {

  constructor() {
    if (!sessionStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
  }

  public static set(key:string, value:string) {
    sessionStorage[key] = value;
  }

  public static get(key:string):string {
    return sessionStorage[key] || null;
  }

  public static setObject(key:string, value:any):void {
    sessionStorage[key] = JSON.stringify(value);
  }

  public static getObject(key:string):any {
    return JSON.parse(sessionStorage[key] || '{}');
  }

  public static remove(key:string) {
    sessionStorage.removeItem(key);
  }
  public static getUser(){
    return JSON.parse(sessionStorage['user'] || '{}');
  }
  public static setUser(value:any) {
    sessionStorage['user'] = JSON.stringify(value);
  }
  public static removeUser() {
    sessionStorage.removeItem('user');
  }
}
