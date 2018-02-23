import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import {Order, TestService} from "./test.service";
import 'rxjs/Rx';
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-order',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
  providers: []
})
export class TestComponent implements OnInit,OnDestroy {
  ngOnDestroy(): void {
    console.log("test component destroy");
  }

  orders: Order[];
  nameFilter: FormControl = new FormControl();
  keyWork: string;
  isShow: string;
  constructor(public router: Router,private testService: TestService) { }

  ngOnInit() {

    this.findAll();
    this.nameFilter.valueChanges
      .debounceTime(500)
      .subscribe(value => {
        this.keyWork = value;
        //this.orders = this.orderService.findList(value);
      });
  }
  create(){
    this.router.navigateByUrl('/test/form/new');
  }
  delete(){
    this.isShow = "none";
  }
  update(order:Order){
    console.log(order);
    this.testService.setOrder(order);
    //this.router.navigateByUrl('/test/form/'+test.userId);
    this.router.navigateByUrl('/test/form/update');
  }
  findAll(){
    let observable:Observable<any> = this.testService.findAll();
    observable.subscribe(data =>{
      if(data.code == 0){
        this.orders = data.data;
      }
    });

  }
  findPage(page){
    console.log(page);
  }

}
