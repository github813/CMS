import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {RedisKey, RedisKeys} from "../../common/redis_keys";
import {RedisService} from "./redis.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-redis',
  templateUrl: './redis.component.html',
  styleUrls: ['./redis.component.css']
})
export class RedisComponent implements OnInit {

  loading: boolean = false;
  saveBtn: boolean = false;
  list:Array<RedisKey> = RedisKeys.list;
  key: FormControl =  new FormControl('');
  hashKey: FormControl =  new FormControl();
  data:string = "";
  constructor(public redisService: RedisService,
              public appComponent:AppComponent
  ) {
    this.key.setValidators(Validators.required);
    this.key.valueChanges.subscribe(this.keyChangeFun.bind(this));
  }

  ngOnInit() {
    //this.key.registerOnChange(this.keyChangeFun);

  }
  find(){
    if(this.key.invalid){//表单验证不通过
      if(this.key.untouched){
        this.showMsg("请填写表单信息","warning");
      }
      return;
    }
    let key = this.key.value;
    let hashKey = this.hashKey.value;
    let redis:RedisKey = this.findRedisKey(key);
    if(redis.type == 'value' && redis.demo){
      key = hashKey;
    }
    this.redisService.get(key, hashKey, redis.type).subscribe(result =>{
      if(result.code == 0){
        this.showMsg("操作成功","success");
        this.data = result.data;
      }else{
        this.showMsg(result.msg,"warning");
        this.saveBtn = false;
      }
    },error =>{
      this.saveBtn = false;
      this.showMsg("网络异常"+error.status,"danger");
    });
  }
  keyChangeFun(value){
    if(value){
      let redis:RedisKey = this.findRedisKey(value);
      if(redis.type == 'value' && redis.demo){
        this.hashKey.setValue(redis.demo);
      }else{
        this.hashKey.setValue(null);
      }
    }
  }
  clear(){
    this.hashKey.reset();
    this.data = "";
  }
  findRedisKey(key: string){
    return this.list.find(r => r.key == key);
  }
  //显示提示信息
  showMsg(msg:string, css:string){
    this.appComponent.showAlert(msg,"alert-"+css);
  }

}
