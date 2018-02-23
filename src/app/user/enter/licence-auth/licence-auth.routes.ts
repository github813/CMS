import {LicenceAuthComponent} from "./licence-auth.component";
import {LicenceAuthFormComponent} from "./licence-auth/licence-auth-form/licence-auth-form.component";
/**
 * Created by cuiwanzhe on 2017/6/20.
 */
export const LicenceAuthRoutes = [
  { path: '', component: LicenceAuthComponent},
  { path: 'form/:action', component: LicenceAuthFormComponent}

];
