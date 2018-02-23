import {OwnerComponent} from "./owner.component";
import {OwnerGradeFormComponent} from "./owner-grade-form/owner-grade-form.component";
/**
 * Created by cuiwanzhe on 2017/6/20.
 */
export const OwnerRoutes = [
  { path: '', component: OwnerComponent},
  { path: 'owner-grade-form/new', component: OwnerGradeFormComponent},
  { path: 'owner-grade-form/:id', component: OwnerGradeFormComponent}
];
