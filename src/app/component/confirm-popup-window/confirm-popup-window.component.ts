import {Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
declare var $;
@Component({
  selector: 'app-confirm-popup-window',
  templateUrl: './confirm-popup-window.component.html',
  styleUrls: ['./confirm-popup-window.component.css']
})
export class ConfirmPopupWindowComponent implements OnInit, OnChanges, DoCheck {
  @Input()
  warningMsg: string;

  @Output()
  result: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    if (this.warningMsg) {
      $("#confirmPopupModal").modal();
    }
  }

  emit(result: boolean) {
    this.result.emit(result);
    $("#confirmPopupModal").modal("hide");
    this.warningMsg = null;
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }


  ngDoCheck(): void {
    this.ngOnInit();
  }
}
