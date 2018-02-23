import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import {Menu} from "../../common/dto";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  @Input()
  menus:Array<Menu>;
  currentMenuId:number;

  @Output()
  menuChange: EventEmitter<Menu> = new EventEmitter();
  constructor(public router:Router) { }

  ngOnInit() {

  }
  menuClick(m:Menu){
    if(!m){
      return;
    }
    //this.router.navigateByUrl(m.link);
    this.currentMenuId = m.id;
    this.menuChange.emit(m);
  }
}

