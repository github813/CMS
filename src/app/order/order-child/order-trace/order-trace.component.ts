/**
 * Created by 123 on 2017/5/13.
 */
import {Component, OnInit} from '@angular/core';
import {Ajax} from "../../../common/ajax";
import {Api} from "app/common/api";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {isUndefined} from "util";
import {Result} from "../../../common/dto";
declare let AMap;
declare let Date;

@Component({
  selector: 'app-order-trace',
  templateUrl: './order-trace.component.html',
  styleUrls: ['./order-trace.component.css']

})
export class OrderTraceComponent implements OnInit {
  public time: string;



  // 传递给result模态框的结果
  result: Result;
  // 控制result模态框的显示
  resultMsgStatus: boolean;

  constructor(public ajax: Ajax,
              public router: Router,
              public activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {
    let childNo = this.activatedRoute.snapshot.params['childNo'];
    this.ajax.getByParams(Api.LIST_POINT_RECORDS, {childNo: childNo}).subscribe(data => {
      if (isUndefined(data.data[0])) {
        this.popResult(null, {code: 1, msg: "没有轨迹"});
        return;
      }
      let map = new AMap.Map('container', {
        resizeEnable: true,
        center: data.data[0].coordinate,
        zoom: 15
      });
      let lineArr = data.data.map(i => i.coordinate);//路径坐标
      let polyline = new AMap.Polyline({
        path: lineArr,          //设置线覆盖物路径
        strokeColor: "#3366FF", //线颜色
        strokeOpacity: 0.8,       //线透明度
        strokeWeight: 5,        //线宽
        strokeStyle: "solid",   //线样式
        strokeDasharray: [10, 5], //补充线样式
        geodesic: true            // 绘制大地线
      });
      polyline.setMap(map);//画线

      let marker = new AMap.Marker({
        position: data.data[0].coordinate//起点坐标
      });
      marker.setMap(map);//设置起点标记

      let marker1 = new AMap.Marker({
        position: data.data.slice(-1)[0].coordinate//终点坐标
      });
      marker1.setMap(map);//设置终点标记

      let time = new Date(new Date(data.data.slice(-1)[0].time.replace(' ', 'T')) - new Date(data.data[0].time.replace(' ', 'T')));
      this.time = `总时间:${time.getUTCHours()}时${time.getUTCMinutes()}分${time.getUTCSeconds()}秒`;

      let content = '<div style="width: 100%;border-radius:5px;height: 2rem;line-height:2rem;background-color: white;color:#000;">' + this.time + '</div>';
      AMap.plugin(['AMap.InfoWindow', 'AMap.ToolBar', 'AMap.OverView', 'AMap.Scale'], function () {
        map.addControl(new AMap.ToolBar({visible: true}));
        map.addControl(new AMap.Scale());
        let infowindow = new AMap.InfoWindow({
          isCustom: true,  //使用自定义窗体
          content: content,
          offset: new AMap.Pixel(0, -30)
        });
        infowindow.open(map, data.data[0].coordinate);
      });


    });
  }

  // 弹出结果提示模态框
  popResult(successMsg: string, result: Result) {
    if (result.code == 0) {
      result.msg = successMsg;
    }
    this.result = result;
    this.resultMsgStatus = true;
    setTimeout(() => {
      this.resultMsgStatus = false;
      setTimeout(() => {
        this.router.navigate(['order/orderChild']);
      }, 2000)
    }, 2000);
  }

  //返回订单列表页
  goBack() {
    this.router.navigate(['order/orderChild']);
  }
}
