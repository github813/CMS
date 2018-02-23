import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {ComponentEvent, Menu} from "../../common/dto";
import {AppService} from "../../app.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input()
  navs:Array<Menu>;
  @Input()
  name:string;
  @Output()
  navChange: EventEmitter<Menu> = new EventEmitter();
  @Output()
  navEvent: EventEmitter<any> = new EventEmitter();
  id:number;
  transform: string = "";
  scroll: number = 0;
  scrollLeftBtn:boolean = false;
  scrollRightBtn:boolean = true;

  constructor(public router:Router,public appService:AppService) {

  }

  ngOnInit() {

  }
  navClick(m:Menu){
    if(!m){
      return;
    }
    this.id = m.id;
    this.navChange.emit(m);
  }
  logout(){
    this.navEvent.emit("logout");
    this.router.navigateByUrl("/login");
  }
  myInfo(){
    this.router.navigateByUrl("/myself/info").catch(e => console.log(e));
  }
  test(){
    this.appService.sendEvent(new ComponentEvent( this,"RoleComponent","ddd",123));
  }
  scrollFun(i:number){
    this.scroll = this.scroll+i;
    if(this.scroll < 0){
      this.scroll = 0;
      return;
    }
    if(this.scroll > 0){
      this.scrollLeftBtn = true;
    }else {
      this.scrollLeftBtn = false;
    }
    if(this.scroll > 5){
      this.scrollRightBtn = false;
    }else{
      this.scrollRightBtn = true;
    }
    this.transform = "translateX("+this.scroll*-200+"px)";
  }

}
