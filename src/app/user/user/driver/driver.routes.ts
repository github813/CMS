import {DriverComponent} from "./driver.component";
import {UserDetailComponent} from "./user-detail/user-detail.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {EvaluateDetailComponent} from "./evaluate-detail/evaluate-detail.component";
/**
 * Created by cuiwanzhe on 2017/6/20.
 */
export const DriverRoutes = [
  { path: '', component: DriverComponent},
  { path: 'user-detail/:id', component: UserDetailComponent},
  { path: 'order-detail/:id', component: OrderDetailComponent},
  { path: 'evaluate-detail/:id', component: EvaluateDetailComponent}

];
