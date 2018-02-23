import { Component, OnInit } from '@angular/core';
import {Order, TestService} from "../test.service";
import {ActivatedRoute, Router} from "@angular/router";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-order-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.css']
})
export class TestFormComponent implements OnInit {
  order:Order;

  formModel: FormGroup = new FormGroup({});
  constructor(private routeInfo:ActivatedRoute, private testService:TestService,
    private router:Router) {

  }

  ngOnInit() {
    let action = this.routeInfo.snapshot.params['action'];
    if(action == 'update'){
      this.order = this.testService.getOrder();
    }else{
      this.order =  new Order(-1,'','','',0);
    }
    //let orderId = this.routeInfo.snapshot.params['id'];
    //this.test = this.orderService.getById(orderId);
  }
  cancel(){
    this.router.navigateByUrl('/test');
  }
  save(){
    this.router.navigateByUrl('/test');
  }

}
