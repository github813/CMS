import {DriverComponent} from "./driver.component";
import {DriverGradeFormComponent} from "./driver-grade-form/driver-grade-form.component";
/**
 * Created by cuiwanzhe on 2017/6/20.
 */
export const DriverRoutes = [
  { path: '', component: DriverComponent},
  { path: 'driver-grade-form/new', component: DriverGradeFormComponent},
  { path: 'driver-grade-form/:id', component: DriverGradeFormComponent}

];
