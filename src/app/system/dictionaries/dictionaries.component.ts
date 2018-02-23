import { Component, OnInit } from '@angular/core';
import {DictionariesService, SystemDictionaries} from "./dictionaries.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {ComponentEvent, Result} from "../../common/dto";
import {Router} from "@angular/router";
import {AppService} from "../../app.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-dictionaries',
  templateUrl: './dictionaries.component.html',
  styleUrls: ['./dictionaries.component.css']
})
export class DictionariesComponent implements OnInit {
  pageNum: number;
  pageSize:number = 10;
  totalNum:number = 0;
  totalPages: number;

  systemDictionariesList: Array<SystemDictionaries> = new Array;

  systemDictionariesQCForm: FormGroup;

  // 将要删除的记录id
  id: number;

  loading:boolean = false;

  constructor(private dictionariesService:DictionariesService,private router:Router,private formBuilder: FormBuilder,public appService:AppService) {
    this.systemDictionariesQCForm = formBuilder.group({
      pageNum: ['1'],
      pageSize: ['10']
    });
  }

  ngOnInit() {
    this.listSystemDictionaries()
  }

  listSystemDictionaries() {
    this.systemDictionariesQCForm.get("pageNum").setValue(this.pageNum);
    this.systemDictionariesQCForm.get("pageSize").setValue(this.pageSize);
    this.dictionariesService.listSystemDictionaries(this.systemDictionariesQCForm.value).subscribe((result) => {
      this.pageNum = result.data.pageNum;
      this.totalNum = result.data.total;
      this.pageSize = result.data.pageSize;
      this.totalPages = result.data.pages;
      this.systemDictionariesList = result.data.list;
    });
  }

  update(id:number){
    this.router.navigateByUrl("/system/dictionaries/dictionaries-form/"+id);
  }
  create(){
    this.router.navigateByUrl("/system/dictionaries/dictionaries-form/new");
  }

  deleteSystemDictionaries(id: number){
    this.loading = true;
    let response:Observable<Result> = this.dictionariesService.deleteSystemDictionaries(id);
    response.subscribe(result =>{
      if(result.code == 0){
        this.showAlert("操作成功","alert-success");
        this.listSystemDictionaries();
      }else{
        this.showAlert(result.msg,"alert-warning");
      }
    },error =>{
      this.showAlert("网络异常"+error.status,"alert-danger");
    },()=>{
      this.loading = false;
    });

  }

  showAlert(msg:string,css:string){
    let e = new ComponentEvent(this,"AppComponent","showAlert",{msg,css});
    this.appService.sendEvent(e);
  }

}
