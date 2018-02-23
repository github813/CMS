/**
 * Created by xujianke on 2017/6/23.
 */

declare var $:any;
export class Toast{
  context;
  message;
  time;
  left;
  top;
  msgEntity;
  constructor(config:{}){
    this.context = config['context']==null?$('body'):config['context'];//上下文
    this.message = config['message'];//显示内容
    this.time = config['time'] ==null?3000:config['time'];//持续时间
    this.left = config['left'];//距容器左边的距离
    this.top = config['top'];//距容器上方的距离
    this.init();
  }
  init(){
    $("#toastMessage").remove();
    //设置消息体
    let msgDIV = new Array();
    msgDIV.push('<div id="toastMessage">');
    msgDIV.push('<span>'+this.message+'</span>');
    msgDIV.push('</div>');
    this.msgEntity = $(msgDIV.join('')).appendTo(this.context);
    //设置消息样式
    let left = this.left == null ? this.context.width()/2-this.msgEntity.find('span').width()/2 : this.left;
    let top = this.top == null ? '90px' : this.top;
    this.msgEntity.css({top:top,left:left});
    this.msgEntity.hide();
  }
  show(){
    this.msgEntity.fadeIn(this.time/2);
    this.msgEntity.fadeOut(this.time/2);
  }
}
