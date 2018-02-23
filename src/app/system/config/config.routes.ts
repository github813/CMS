import {OrderChildDriverCancelRuleComponent} from "./order-child-driver-cancel-rule/order-child-driver-cancel-rule.component";
import {OrderChildOwnerCancelRuleComponent} from "./order-child-owner-cancel-rule/order-child-owner-cancel-rule.component";
import {OwnerBannerComponent} from "./banner/owner-banner/owner-banner.component";
import {DriverBannerComponent} from "./banner/driver-banner/driver-banner.component";
import {OrderInsuranceFeeRuleComponent} from "./order-insurance-fee-rule/order-insurance-fee-rule.component";
/**
 * Created by wangjianxin on 2017/6/30.
 */
export const ConfigRoutes = [
  { path: '', component: OrderChildDriverCancelRuleComponent},
  { path: 'order/orderChildOwnerCancelRule/list', component: OrderChildOwnerCancelRuleComponent},
  { path: 'order/orderChildDriverCancelRule/list', component: OrderChildDriverCancelRuleComponent},
  { path: 'banner/owner', component: OwnerBannerComponent},
  { path: 'banner/owner/list', component: OwnerBannerComponent},
  { path: 'banner/driver', component: DriverBannerComponent},
  { path: 'banner/driver/list', component: DriverBannerComponent},
  { path: 'order/orderInsuranceFeeRule', component: OrderInsuranceFeeRuleComponent},
  { path: 'order/orderInsuranceFeeRule/list', component: OrderInsuranceFeeRuleComponent}



];
