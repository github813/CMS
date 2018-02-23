import {CpcnFeeComponent} from "./cpcn-fee.component";
import {RechargeComponent} from "./recharge/recharge.component";
import {BindingComponent} from "./binding/binding.component";
import {SettlementComponent} from "./settlement/settlement.component";
/**
 * Created by xujianke on 2017/9/11.
 */
export const CpcnFeeRoutes = [
  { path: '', component: CpcnFeeComponent,children:[
    {path: 'recharge', component : RechargeComponent},
    {path: 'binding', component : BindingComponent},
    {path: 'settlement', component : SettlementComponent}
  ]},
];
