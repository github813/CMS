import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ExpService,Explog,DriverInfo} from "../../exp.service";
import {Observable} from "rxjs/Observable";
import {Page} from "../../../../../component/pagination/pagination.component";
import {SessionStorage} from "../../../../../common/session_storage";

@Component({
  selector: 'app-exploglist',
  templateUrl: './exploglist.component.html'
})
export class ExploglistComponent implements OnInit {
  public  exploglist:Explog[];
  public usertype:string;
  pageNum: number;
  pageSize: number = 10;
  totalNum: number = 0;
  totalPages: number;
  userId:number;
  userInfo:DriverInfo;
  constructor(private router:Router,private expService:ExpService,private routerInfo: ActivatedRoute) { }

  ngOnInit() {
    this.usertype= this.routerInfo.snapshot.params['usertype'];
    this.userId=this.routerInfo.snapshot.params['id'];
    this.userInfo=SessionStorage.getObject("userinfo");
    this.pageNum=1;
    this.findlistpage();
  }
  findlistpage(){
    let response:Observable<any>;
    if(this.usertype=="driver"){
      response=this.expService.driverExpLoglist(this.userId,this.pageNum,this.pageSize);
    }else{
      response=this.expService.ownerExpLoglist(this.userId,this.pageNum,this.pageSize);
    }
    response.subscribe(ret =>{
      if(ret.code == 0){
        this.exploglist=ret.data.list;
        this.pageNum = ret.data.pageNum;
        this.totalNum = ret.data.total;
        this.pageSize = ret.data.pageSize;
        this.totalPages = ret.data.pages;
      }
    })
  }
  changePageNum(page: Page) {
    this.pageNum= page.pageNum;
    this.pageSize = page.pageSize;
    this.findlistpage();
  }
  goback(){
    this.router.navigateByUrl('/user/user/exp/'+this.usertype+"exp");
  }
}
