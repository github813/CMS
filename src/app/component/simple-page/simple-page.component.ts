import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-simple-page',
  templateUrl: './simple-page.component.html',
  styleUrls: ['./simple-page.component.css']
})
export class SimplePageComponent implements OnInit,OnChanges {

  currentPage:number = 1;
  totalPage:number = 1;
  isShowNext:boolean = false;
  isShowPrev:boolean = false;
  isShowBegin:boolean = false;
  isShowEnd:boolean = false;
  arrPage:number[] = [];
  btnNum:number = 7;

  pageInput:FormControl = new FormControl();

  @Input()
  page:any ={};


  @Output()
  pageChange:EventEmitter<number> =  new EventEmitter<number>();

  constructor() { }
  selectPage(i:number){
    this.currentPage = i;
    this.pageChange.emit(this.currentPage);
    this.showBtn();
  }
  next(){
    if(this.totalPage > this.currentPage){
      this.currentPage++;
      this.pageChange.emit(this.currentPage);
      this.showBtn();
    }
  }
  prev(){
    if(this.currentPage > 1){
      this.currentPage--;
      this.pageChange.emit(this.currentPage);
      this.showBtn();
    }
  }
  begin(){
    this.currentPage = 1;
    this.pageChange.emit(this.currentPage);
    this.showBtn();
  }
  end(){
    this.currentPage = this.totalPage;
    this.pageChange.emit(this.currentPage);
    this.showBtn();
  }

  ngOnInit() {
    this.totalPage = Math.floor(this.page.totalNum/this.page.pageSize);
    if(this.page.totalNum % this.page.pageSize > 0){
      this.totalPage++;
    }
    console.log(this.page);
    if(this.page.currentPage){
      this.currentPage = this.page.currentPage;
    }
    this.showBtn();

  }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.page.reset){
      this.currentPage = 1;
    }
    this.ngOnInit();
  }
  showBtn(){
    this.isShowNext = this.totalPage > this.currentPage;

    this.isShowPrev = this.currentPage > 1;

    this.isShowBegin = this.currentPage != 1;

    this.isShowEnd = this.currentPage < this.totalPage;

    let begin=1;
    let end=1;
    let half = Math.floor(this.btnNum/2);
    if(this.totalPage < this.btnNum){
      end = this.totalPage;
    }else{
      begin = this.currentPage - half;
      end = this.currentPage + half;
      if(this.currentPage-half < 1){
        begin = 1;
        end = this.btnNum;
      }
      if(this.currentPage+half > this.totalPage){
        begin = this.totalPage - this.btnNum+1;
        end = this.totalPage;
      }
    }
    this.arrPage=[];
    for(; begin<=end; begin++){
      this.arrPage.push(begin);
    }
  }
  goPage(){
    let i = this.pageInput.value *1;
    if(i<1 || i > this.totalPage){
      return;
    }
    this.selectPage(i);

  }

}
