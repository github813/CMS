import {Component, DoCheck, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
declare var $;
@Component({
  selector: 'app-image-carousel',
  templateUrl: './image-carousel.component.html',
  styleUrls: ['./image-carousel.component.css']
})
export class ImageCarouselComponent implements OnInit, DoCheck, OnChanges {
  @Input()
  imageCarouse: ImageCarouse ;

  constructor() {
  }

  ngOnInit() {

  }

  open() {
    $("#imageCarouseModal").modal();
  }


  ngDoCheck(): void {
    this.ngOnInit();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.imageCarouse && this.imageCarouse.imageList && this.imageCarouse.imageList.length > 0) {
      this.open();
    }
  }
}

export class ImageCarouse {
  title: string;
  domain: string;
  imageList: Array<string>;
}


