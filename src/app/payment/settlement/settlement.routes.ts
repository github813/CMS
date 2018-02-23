import {SettlementComponent} from "./settlement.component";
import {SettlementFormComponent} from "./settlement-form/settlement-form.component";
import {SettlementViewComponent} from "./settlement-view/settlement-view.component";
/**
 * Created by xujianke on 2017/8/23.
 */
export const SettlementRoutes = [
  { path: '', component: SettlementComponent},
  { path: 'form', component: SettlementFormComponent},
  { path: 'view/:id', component: SettlementViewComponent},
];
