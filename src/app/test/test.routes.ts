import {OneComponent} from "./one/one.component";
import {TwoComponent} from "./two/two.component";
import {TestComponent} from "./test.component";
import {TestFormComponent} from "./test-form/test-form.component";
/**
 * Created by xujianke on 2017/6/13.
 */
export const TestRoutes = [
  { path: '', component: TestComponent ,children:[
      {path: 'test', component : TestFormComponent}
    ]},
  { path: 'form/:action', component: TestFormComponent, children:[
    {path: '', component : TwoComponent},
    {path: 'one/:id', component : OneComponent},

  ]}
];
