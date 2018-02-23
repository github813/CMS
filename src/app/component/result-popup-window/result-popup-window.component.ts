import {Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Result} from "../../common/dto";
declare var $;
@Component({
  selector: 'app-result-popup-window',
  templateUrl: './result-popup-window.component.html',
  styleUrls: ['./result-popup-window.component.css']
})
export class ResultPopupWindowComponent implements OnInit, OnChanges {
  @Input()
  result: Result;

  @Input()
  status: boolean;

  ngOnInit() {
    if (this.status == true && this.result) {
      $("#resultPopupModal").modal();
    } else {
      $("#resultPopupModal").modal("hide");
    }
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.ngOnInit();
  }
}
