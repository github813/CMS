import {
  Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output
} from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
/**
 * 分页组件
 */
export class PaginationComponent implements OnInit, OnChanges {
  // 页码
  @Input()
  currentPage: number;
  // 总共多少页
  @Input()
  totalPages: number;
  // 总共多少条记录
  @Input()
  totalNum: number;
  // 页容量
  @Input()
  pageSize: number;

  // 向外发射分页信息
  @Output()
  pageChange: EventEmitter<Page> = new EventEmitter<Page>();

  // bootstrap分页option
  options: any = {
    currentPage: 1,
    totalPages: 1,
    object1: this,
    onPageClicked: function (event, originalEvent, type, page) {
      console.log("change page" + page);
      // 当页码改变时将currentPage输入框的值改变
      $('#currentPage').val(page);
      $('#gotoPage').trigger('click');
    },
    itemTexts: function (type, page, current) {
      switch (type) {
        case "first":
          return "首页";
        case "prev":
          return "上一页";
        case "next":
          return "下一页";
        case "last":
          return "末页";
        case "page":
          return page;

      }
    }
  };


  constructor() {
  }

  ngOnInit() {
    console.log("分页初始化");
    if (this.totalPages < 1) {
      this.totalPages = 1;
    }
    if (this.currentPage < 1) {
      this.currentPage = 1;
    }
    this.options.currentPage = this.currentPage;
    this.options.totalPages = this.totalPages;
    $('#paginator').bootstrapPaginator(this.options);
  }


  // 修改页码后调用
  gotoPage(): void {
    this.currentPage = this.currentPage = $('#currentPage').val();
    this.pageChange.emit(new Page(this.currentPage, this.pageSize));
  }

  // 修改页容量后调用
  changePageSize(): void {
    this.pageSize = $("#pageSize").val();
    this.currentPage = 1;
    this.pageChange.emit(new Page(this.currentPage, this.pageSize));
  }

  ngOnChanges(): void {
    this.ngOnInit();
  }
}

export class Page {
  constructor(public pageNum: number,
              public pageSize: number) {

  }
}
