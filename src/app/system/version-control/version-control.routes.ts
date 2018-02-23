import {VersionControlComponent} from "./version-control.component";
import {VersionControlFormComponent} from "./version-control-form/version-control-form.component";
/**
 * Created by cuiwanzhe on 2017/6/30.
 */
export const VersionControlRoutes = [
  { path: '', component: VersionControlComponent},
  { path: 'version-control-form/new', component: VersionControlFormComponent},
  { path: 'version-control-form/:id', component: VersionControlFormComponent}
];
