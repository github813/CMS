import {OrderInfoListComponent} from "./order-info-list/order-info-list.component";
import {OrderInfoDetailComponent} from "./order-info-detail/order-info-detail.component";
/**
 * Created by xujianke on 2017/6/13.
 */
export const OrderInfoRoutes = [
  { path: '', component: OrderInfoListComponent},
  { path: ':orderNo', component: OrderInfoDetailComponent},
];
