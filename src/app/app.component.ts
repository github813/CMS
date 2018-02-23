import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";
import {AppService} from "./app.service";
import {SessionStorage} from "./common/session_storage";
import {ComponentEvent, Menu, Result} from "./common/dto";

declare let $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = '';
  menus: Menu[];
  navs: Array<Menu>;
  alert: any = {isShow: false, msg: "", css: "alert-danger"};
  toast: any = {isShow: false, isIn: false, msg: ""};
  isLogin:boolean = false;
  name: string;
  menuPid: number;
  constructor(public router: Router, public appService: AppService) {
    $.extend( $.fn.dataTable.defaults, {
      "language": {
        "search": "<span>搜索</span> _INPUT_",
        "lengthMenu": "每页<span>_MENU_</span>条",
        "paginate": {"sFirst": "首页","sPrevious": "上一页","sNext": "下一页","sLast": "末页" },
        "processing": "正在加载中......",
        "zeroRecords": "对不起，查询不到相关数据！",
        "emptyTable": "表中无数据存在！",
        "info": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_ 条记录",
        "infoFiltered": "数据表中共为 _MAX_ 条记录",
      },"sDom": "<'row'<'col-lg-4'l><'col-lg-4'T><'col-lg-4'f>r>t<'row'<'col-lg-6'i><'col-lg-6'p>>"
    });
    this.appService.addListenEvent("AppComponent",(event:ComponentEvent) =>{
      if(event.name =="showAlert"){
        this.showAlert(event.data.msg,event.data.css);
      }
      if(event.name =="showToast"){
        this.showToast(event.data);
      }
      if(event.name =="loginMsg"){
        this.loginMsg();
      }
      if(event.name =="checkUrl"){
        this.checkUrl(event.data);
      }
    });
    router.events.filter(event => event instanceof NavigationEnd)
      .subscribe((event:NavigationEnd) => {
        this.checkUrl(event.url);
    });
  }
  menuChange(m:Menu){
    if(m.link){
      this.router.navigateByUrl(m.link);
    }
    this.title = m.title;

  }
  navChange(n:Menu){
    if(n.link){
      this.router.navigateByUrl(n.link);
    }
    this.showMenu(n.id);
    this.menuPid = n.id;
  }
  ngOnInit() {
    let user = SessionStorage.getUser();
    if(user && user.userId){
      this.isLogin = true;
      this.name = user.name;
      this.loadNav();
    }else {
      this.isLogin = false;
      this.router.navigateByUrl("/login");
    }
  }
  showMenu(id:number){
    //this.appService.findMenus(id).subscribe(data=>this.menus = data);
    this.appService.findMenu().subscribe(ret =>{
      if(ret.code == 0){
        //过滤出二级菜单
        this.menus= ret.data.filter(menu => {
          if (menu.pid == id) {//匹配
            if (menu['child'] == null) {//没有初始化过子菜单
              // 组装子菜单
              menu['child'] = ret.data.filter(m => m.pid == menu.id);
            }
            return true;
          }
          return false;
        });
      }
    });
  }
  showAlert(msg:string,css:string) {
    this.alert.msg = msg;
    this.alert.css = css;
    this.alert.isShow = true;
    setTimeout(e => this.alert.isShow = false, 4000);
  }
  showToast(msg:string){//*ngIf="toast.isShow"
    this.toast.isShow = true;
    this.toast.msg = msg;

    setTimeout(() => this.toast.isIn = true,100);
    setTimeout(() => this.toast.isIn = false, 4000);
    setTimeout(() => this.toast.isShow = false, 4400);
  }
  loginMsg(){
    this.router.navigateByUrl("/home");
    this.ngOnInit();
  }
  loadNav(){
    //查询一级导航
    this.appService.findMenu().subscribe((ret:Result) =>{
      if(ret.code == 0){
        this.navs = ret.data.filter(menu => menu.pid == 1);
      }
    });
  }
  onNavEvent(msg){
    if(msg == "logout"){
      SessionStorage.removeUser();
      this.appService.allMenus = null;
      this.ngOnInit();
    }
  }
  checkUrl(url:string){
    if(url.startsWith('/login')){
      return;
    }
    if(url.startsWith('/')){
      url = url.substring(1);
    }

    if(this.appService.allMenus){
      let pid;
      let menu = this.appService.allMenus.find(menu => menu.link == url && menu.pid == 1);
      let menu2 =this.appService.allMenus.find(menu => menu.link == url && menu.pid > 1);

      if(menu){
        pid = menu.id;

      }else{
        if(!menu2)return;
        pid = this.findNavMenu(menu2.pid);
      }
      if(menu2)menu = menu2;

      if(!this.menuPid || pid != this.menuPid){//第一次打开或者路由变更了菜单没切换
        this.showMenu(pid);
        this.menuPid = pid;
      }

      if(this.title != menu.title){
        this.title =  menu.title;
      }
      return;
    }
    this.appService.findMenu().subscribe(ret =>{
      if(ret.code == 0){
        this.checkUrl(url);
      }
    });
  }
  findNavMenu(id:number){
    let m =this.appService.allMenus.find(menu => menu.id == id);
    if(m.pid == 1)return m.id;
    return this.findNavMenu(m.pid);
  }
}
