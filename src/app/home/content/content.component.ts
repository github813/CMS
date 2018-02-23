import {Component, Input, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import 'rxjs/add/operator/filter'

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Input()
  pageTitle:string = '';
  pageDesc:string ='';
  @Input()
  alert:any;// = {isShow:false, msg:"", css:"alert-danger"};
  constructor(public router: Router) {
    this.router.events
      .filter(event => event instanceof NavigationEnd)
      .subscribe((event: NavigationEnd) => {
        //console.log(event);
        /*
        if(event.url == '/home'){
          this.pageTitle = '首页';
          this.pageDesc = '';
        }else if(event.url.startsWith('/order')){
          this.pageTitle = '货单管理';
          this.pageDesc = '列表';
        }
        */
      });
  }

  ngOnInit() {
  }
  //
  showAlert(msg:string,css:string){//
    this.alert.msg = msg;
    this.alert.css = css;//alert-danger alert-info alert-warning alert-success
    this.alert.isShow = true;
    setTimeout(e => this.alert.isShow = false, 4000);
  }
}
