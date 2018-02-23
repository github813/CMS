import {OwnerComponent} from "./owner.component";
import {OwnerDetailComponent} from "./owner-detail/owner-detail.component";
import {EvaluateDetailComponent} from "./evaluate-detail/evaluate-detail.component";
import {OrderDetailComponent} from "./order-detail/order-detail.component";
import {AddressDetailComponent} from "./address-detail/address-detail.component";
import {BlackDetailComponent} from "./black-detail/black-detail.component";
import {AddressEditComponent} from "./address-detail/address-edit.component";

/**
 * Created by cuiwanzhe on 2017/6/20.
 */
export const OwnerRoutes = [
  { path: '', component: OwnerComponent},
  { path: 'owner-detail/:id', component: OwnerDetailComponent},
  { path: 'evaluate-detail/:id', component: EvaluateDetailComponent},
  { path: 'order-detail/:id', component: OrderDetailComponent},
  { path: 'address-detail/:id', component: AddressDetailComponent},
  { path: 'black-detail/:id', component: BlackDetailComponent},
  { path: 'address-edit/:id', component: AddressEditComponent}
];
