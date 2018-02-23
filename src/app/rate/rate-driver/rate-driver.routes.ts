/**
 * Created by cuiwanzhe on 2017/6/30.
 */

import {RateDriverComponent} from "./rate-driver.component";
import {DriverFormComponent} from "./driver-form/driver-form.component";

export const RateDriverRoutes = [
  { path: '', component: RateDriverComponent},
  { path: 'driver-form/new', component: DriverFormComponent},
  { path: 'driver-form/:id', component: DriverFormComponent}
];
