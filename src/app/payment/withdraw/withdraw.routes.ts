import {WithdrawComponent} from "./withdraw.component";
import {WithdrawViewComponent} from "./withdraw-view/withdraw-view.component";
/**
 * Created by xujianke on 2017/8/1.
 */
export const WithdrawRoutes = [
  { path: '', component: WithdrawComponent},
  { path: 'view/:id', component: WithdrawViewComponent},

];
