import {TruckComponent} from "./truck.component";
import {TruckDetailComponent} from "./truck-detail/truck-detail.component";
/**
 * Created by cuiwanzhe on 2017/6/20.
 */
export const TruckRoutes = [
  { path: '', component: TruckComponent},
  { path: 'truck-detail/:id', component: TruckDetailComponent}

];
