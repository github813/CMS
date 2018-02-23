import {Injectable} from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Observable} from "rxjs/Observable";
import {Api} from "../../../common/api";
import {OwnerAuthInfo} from "../../enter/owner/owner.service";

@Injectable()
export class OwnerService {

  constructor(public ajax: Ajax) {
  }

  findList(page: number): Observable<any> {
    return this.ajax.getByParams(Api.ownerInfoList, {page: page})
  }

  /**
   * 获取评价信息
   * @param ownerId
   * @returns {Observable<any>}
   */
  getOwnerEvaluateByUserId(ownerId: number): Observable<any> {
    return this.ajax.getByParams(Api.getOwnerEvaluateByUserId, {userId: ownerId})
  }

  findByOwnerId(ownerId: number): Observable<any> {
    return this.ajax.getByParams(Api.getOwnerInfoByOwnerId, {ownerId: ownerId})
  }

  listDriverInfo(ownerInfoQC: OwnerInfoQC): Observable<any> {
    return this.ajax.getByParams(Api.listOwnerInfo, ownerInfoQC);
  }

  exportOwnerUserToExcel(): Observable<any> {
    return this.ajax.getBlob(Api.EXPORT_OWNER_USER, null);
  }
//
  getAddressByUserId (para: any): Observable<any> {
    return this.ajax.getByParams(Api.Address_list, para)
  }
  getAddressById (para: any): Observable<any> {
    return this.ajax.getByParams(Api.Address_Info_Id, para)
  }
  getAddressContacts(para: any): Observable<any> {
    return this.ajax.getByParams(Api.Address_Contacts, para)
  }
  getOwnerDetailById(ownerId: number): Observable<any> {
    return this.ajax.getByParams(Api.OwnerDetailById, {ownerId: ownerId})
  }
  getOwnerBlack(ownerId: number): Observable<any> {
    return this.ajax.getByParams(Api.OwnerBlack, {ownerId: ownerId})
  }
  CheckMobile(ownerId: number): Observable<any> {
    return this.ajax.getByParams(Api.OwercheckMobile, {mobile: ownerId})
  }
  AddaddressContact(para: any): Observable<any> {
    return this.ajax.post(Api.AddaddressContact, para)
  }
  DeladdressContact(para: any): Observable<any> {
    return this.ajax.deleteByParams(Api.DeladdressContact, para)
  }
  AddreContactsetmain(ownerId:string,addressId:string,contactId:string): Observable<any> {
    let form: FormData = new FormData;
    form.append("ownerId",ownerId);
    form.append("addressId",addressId);
    form.append("contactId",contactId);
    return this.ajax.post(Api.AddreContactsetMain, form);
  }
}

export class OwnerInfo {
  constructor(public id: number,
              public name: string,
              public mobile: string,
              public status: number,
              public authed: number,
              public sex: number,
              public headImg: string,
              public domain: string,
              public ownerBlackListList: OwnerBlack[],
              public ownerStaffList: OwnerStaff[],
              public ownerAddressList: OwnerAddress[]) {
  }
}

export class EvaluateDTO {
  constructor(public userId: number,
              public orderNo: string,
              public mobile: string,
              public userName: string,
              public fromId: number,
              public headImg: string,
              public fromName: string,
              public type: number,
              public comment: string,
              public time: string,
              public evaluateLabelDTOList: EvaluateLabelDTO[]) {
  }
}

export class EvaluateLabelDTO {
  constructor(public labelId: number,
              public label: string) {
  }
}

export class OwnerBlack {
  constructor(public id: number,
              public name: string,
              public phone: string) {
  }
}

export class OwnerStaff {
  constructor(public id: number,
              public name: string,
              public phone: string) {
  }
}

export class OwnerAddress {
  constructor(public type: number,
              public name: string,
              public phone: string,
              public company: string,
              public province: string,
              public city: string,
              public county: string,
              public town: string,
              public address: string) {
  }
}

export class OwnerInfoQC {
  constructor(name: string,//姓名
              mobile: string,//电话号
              status: number,//启用状态
              authed: number,//审核状态
              pageNum,
              pageSize) {

  }
}
