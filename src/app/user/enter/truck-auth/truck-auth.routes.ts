import {TruckAuthComponent} from "./truck-auth.component";
import {TruckAuthFormComponent} from "./truck-auth-form/truck-auth-form.component";
/**
 * Created by cuiwanzhe on 2017/6/20.
 */
export const TruckAuthRoutes = [
  { path: '', component: TruckAuthComponent},
  { path: 'form/:id', component: TruckAuthFormComponent}

];
