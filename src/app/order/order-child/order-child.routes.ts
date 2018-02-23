import {OrderChildListComponent} from "./order-child-list/order-child-list.component";
import {OrderChildDetailComponent} from "./order-child-detail/order-child-detail.component";
import {OrderTraceComponent} from "./order-trace/order-trace.component";
import {OrderChildStatisticsComponent} from "./order-child-statistics/order-child-statistics.component";
/**
 * Created by xujianke on 2017/6/13.
 */
export const OrderChildRoutes = [
  { path: '', component: OrderChildListComponent},
  { path: ':childNo', component: OrderChildDetailComponent},
  { path: 'orderTrace/:childNo', component: OrderTraceComponent},
  { path: 'statistics/child', component: OrderChildStatisticsComponent}
];
