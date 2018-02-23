import {OwnerComponent} from "./owner.component";
import {FormComponent} from "./form/form.component";
/**
 * Created by cuiwanzhe on 2017/6/20.
 */
export const OwnerRoutes = [
  { path: '', component: OwnerComponent},
  { path: 'form/:action', component: FormComponent},
  { path: '/:type', component: OwnerComponent}

];
