import { Component, OnInit } from '@angular/core';
import {OwnerGrade,  OwnerService} from "../owner/owner.service";
import {FormBuilder} from "@angular/forms";
import {AppService} from "../../../app.service";
import {Router} from "@angular/router";
import {AppComponent} from "../../../app.component";

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit {
  ownerGradeList: Array<OwnerGrade> = new Array;

  constructor(private ownerService:OwnerService,private router:Router,private formBuilder: FormBuilder,public appService:AppService,public appComponent:AppComponent) { }

  ngOnInit() {
    this.listOwnerGrades();
  }

  update(id:number){
    this.router.navigateByUrl("/user/grade/owner/owner-grade-form/"+id);
  }
  create(){
    this.router.navigateByUrl("/user/grade/owner/owner-grade-form/new");
  }
  deleteGrade(id:number){

    this.ownerService.OwnerUserGradeDel(id).subscribe(data=>{
      if(data.code==0){
        this.showMsg("操作成功","success");
        this.listOwnerGrades();
      }else{
        this.showMsg(data.msg,"warning")
      }
    })
  }
  listOwnerGrades() {
    this.ownerService.listOwnerGrades().subscribe((result) => {
      this.ownerGradeList = result.data;
      console.log(this.ownerGradeList);
    });
  }
  showMsg(msg:string, css:string){
    this.appComponent.showAlert(msg,"alert-"+css);
  }
}
