import {DictionariesComponent} from "./dictionaries.component";
import {DictionariesFormComponent} from "./dictionaries-form/dictionaries-form.component";
/**
 * Created by cuiwanzhe on 2017/6/30.
 */
export const DictionariesRoutes = [
  { path: '', component: DictionariesComponent},
  { path: 'dictionaries-form/new', component: DictionariesFormComponent},
  { path: 'dictionaries-form/:id', component: DictionariesFormComponent}
];
