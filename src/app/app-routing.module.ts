import {NgModule} from '@angular/core';
import {Routes, RouterModule, LoadChildren} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {LoginComponent} from "./home/login/login.component";

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'home', component: HomeComponent},
  {path: 'system/staff', loadChildren: './system/staff/staff.module#StaffModule'},
  {path: 'system/role', loadChildren: './system/role/role.module#RoleModule'},
  {path: 'system/department', loadChildren: './system/department/department.module#DepartmentModule'},
  {path: 'system/menu', loadChildren: './system/menu/menu.module#MenuModule'},
  {path: 'system/dictionaries', loadChildren: './system/dictionaries/dictionaries.module#DictionariesModule'},
  {path: 'system/version-control', loadChildren: './system/version-control/version-control.module#VersionControlModule'},
  {path: 'system/redis', loadChildren: './system/redis/redis.module#RedisModule'},
  {path: 'system/standardAddress', loadChildren: './system/standard-address/standard-address.module#StandardAddressModule' },
  {path: 'myself/info', loadChildren: './myself/info/info.module#InfoModule'},
  {path: 'payment/recharge', loadChildren: './payment/recharge/recharge.module#RechargeModule'},
  {path: 'payment/withdraw', loadChildren: './payment/withdraw/withdraw.module#WithdrawModule'},
  {path: 'payment/settlement', loadChildren: './payment/settlement/settlement.module#SettlementModule'},
  {path: 'payment/cpcnFee', loadChildren: './payment/cpcn-fee/cpcn-fee.module#CpcnFeeModule'},
  {path: 'payment/bankCard', loadChildren: './payment/bank-card/bank-card.module#BankCardModule'},
  {path: 'user/user/driver', loadChildren: './user/user/driver/driver.module#DriverModule'},
  {path: 'user/user/truck', loadChildren: './user/user/truck/truck.module#TruckModule'},
  {path: 'user/user/owner', loadChildren: './user/user/owner/owner.module#OwnerModule'},
  {path: 'user/vip/vipowner', loadChildren: './user/vip/vipowner/vipowner.module#VipownerModule'},
  {path: 'user/enter/owner', loadChildren: './user/enter/owner/owner.module#OwnerModule'},
  {path: 'user/enter/ownerCompany', loadChildren: './user/enter/ownerCompany/owner.module#OwnerModule'},
  {path: 'user/enter/driver', loadChildren: './user/enter/driver/driver.module#DriverModule'},
  {path: 'user/enter/truck-auth', loadChildren: './user/enter/truck-auth/truck-auth.module#TruckAuthModule'},
  {path: 'user/enter/licence-auth', loadChildren: './user/enter/licence-auth/licence-auth.module#LicenceAuthModule'},
  {path: 'user/rate/rate-driver', loadChildren: './rate/rate-driver/rate-driver.module#RateDriverModule'},
  {path: 'user/rate/rate-owner', loadChildren: './rate/rate-owner/rate-owner.module#RateOwnerModule'},
  {path: 'user', component: HomeComponent},
  {path: 'user/star/owner', loadChildren: './user/star/owner-star/owner-star.module#OwnerStarModule'},
  {path: 'user/star/driver', loadChildren: './user/star/driver-star/driver-star.module#DriverStarModule'},
  {path: 'user/grade/owner', loadChildren: './user/grade/owner/owner.module#OwnerModule'},
  {path: 'user/grade/driver', loadChildren: './user/grade/driver/driver.module#DriverModule'},
  {path: 'test', loadChildren: './test/test.module#TestModule'},
  {path: 'dataTable', loadChildren: './data-table/data-table.module#DataTableModule'},
  {path: 'order/orderChild', loadChildren: './order/order-child/order-child.module#OrderChildModule'},
  {path: 'order/orderInfo', loadChildren: './order/order-info/order-info.module#OrderInfoModule'},
  {path: 'order/orderTrade', loadChildren: './order/order-trade/order-trade.module#OrderTradeModule'},
  {path: 'order/orderSync', loadChildren: './order/order-sync/order-sync.module#OrderSyncModule'},
  {path: 'order/orderComplete', loadChildren: './order/order-complete/order-complete.module#OrderCompleteModule'},
  {path: 'system/config', loadChildren: './system/config/config.module#ConfigModule'},
  {path: "message", loadChildren: './message/message.module#MessageModule'},
  {path: "log", loadChildren: './log/log.module#LogModule'},
  { path:'user/user/exp',loadChildren:'./user/user/exp/exp.module#ExpModule'},
  { path: 'user/expget', loadChildren:'./user/expget/expget.module#ExpGetModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
