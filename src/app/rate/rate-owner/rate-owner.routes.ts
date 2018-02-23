/**
 * Created by cuiwanzhe on 2017/6/30.
 */

import {RateOwnerComponent} from "./rate-owner.component";
import {OwnerFormComponent} from "./owner-form/owner-form.component";

export const RateOwnerRoutes = [
  { path: '', component: RateOwnerComponent},
  { path: 'owner-form/new', component: OwnerFormComponent},
  { path: 'owner-form/:id', component: OwnerFormComponent}
];
