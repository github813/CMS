import { Component, OnInit } from '@angular/core';
import {DriverGrade, DriverService} from "./driver.service";
import {AppService} from "../../../app.service";
import {AppComponent} from "../../../app.component";
import {Router} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {Observable} from "rxjs/Observable";
import {Result} from "../../../common/dto";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.css']
})
export class DriverComponent implements OnInit {

  driverGradeList: Array<DriverGrade> = new Array;

  constructor(private driverService:DriverService,private router:Router,private formBuilder: FormBuilder,public appService:AppService,public appComponent:AppComponent ) { }

  ngOnInit() {
    this.listDriverGrades();
  }

  update(id:number){
    this.router.navigateByUrl("/user/grade/driver/driver-grade-form/"+id);
  }
  create(){
    this.router.navigateByUrl("/user/grade/driver/driver-grade-form/new");
  }

  listDriverGrades() {
    this.driverService.listDriverGrades().subscribe((result) => {
      this.driverGradeList = result.data;
      console.log(this.driverGradeList);
    });
  }
  //显示提示信息
  showMsg(msg:string, css:string){
    this.appComponent.showAlert(msg,"alert-"+css);
  }
  deleteDriverGrade(id: number){

    let response:Observable<Result> = this.driverService.deleteDriverGrade(id);
    response.subscribe(result => {
      if (result.code == 0) {
        this.listDriverGrades();
        this.showMsg("操作成功","success");
      } else {
        this.showMsg(result.msg,"warning");
      }
    })
  }

}
