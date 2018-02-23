import {RechargeComponent} from "./recharge.component";
import {RechargeFormComponent} from "./recharge-form/recharge-form.component";
import {RechargeViewComponent} from "./recharge-view/recharge-view.component";
/**
 * Created by xujianke on 2017/6/19.
 */
export const RechargeRoutes = [
  { path: '', component: RechargeComponent},
  { path: 'form', component: RechargeFormComponent},
  { path: 'view/:id', component: RechargeViewComponent},

];
