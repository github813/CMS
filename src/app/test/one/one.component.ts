import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.css']
})
export class OneComponent implements OnInit {
  orderId:number;
  constructor(private routerInfo:ActivatedRoute) { }

  ngOnInit() {
    this.orderId = this.routerInfo.snapshot.params['id'];
  }

}
