import {FormComponent} from "./form/form.component";
import {DriverComponent} from "./driver.component";
/**
 * Created by cuiwanzhe on 2017/6/20.
 */
export const DriverRoutes = [
  { path: '', component: DriverComponent},
  { path: 'form/:action', component: FormComponent}

];
