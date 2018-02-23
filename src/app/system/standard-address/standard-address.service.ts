import { Injectable } from '@angular/core';
import { Ajax } from "../../common/ajax";
import { Observable } from "rxjs/Observable";
import { Api } from "../../common/api";
import { URLSearchParams } from '@angular/http';

@Injectable()
export class StandardAddressService {
    constructor(private ajax: Ajax) {
    }
    getSystemOwnerAddressList(address): Observable<any> {
        console.log(address)
        return this.ajax.post(Api.getSystemOwnerAddressList, address);
    }
    public deleteSystemOwnerAddressById(id):Observable<any> {
        return this.ajax.put(Api.deleteSystemOwnerAddressById,id)
    }
    saveSystemOwnerAddress(address){
        return this.ajax.post(Api.saveSystemOwnerAddress, address);
    }
    editSystemOwnerAddress(address){
        return this.ajax.put(Api.editSystemOwnerAddress,address);
    }
    public getProvinceList(province): Observable<any> {
      var params = new URLSearchParams();
      params.set('callback', 'JSONP_CALLBACK');
      return this.ajax.getByParams(Api.getProvinceList + province + ".json", params);
  }
}

