import {StaffComponent} from "./staff.component";
import {StaffFormComponent} from "./staff-form/staff-form.component";
import {RoleSelectComponent} from "../role/role-select/role-select.component";
/**
 * Created by xujianke on 2017/6/19.
 */
export const StaffRoutes = [
  { path: '', component: StaffComponent},
  { path: 'form/new', component: StaffFormComponent,children:[
    {path: 'role', component :RoleSelectComponent}
  ]},
  { path: 'form/:id', component: StaffFormComponent},

];
