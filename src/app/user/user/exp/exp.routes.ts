import {DriverexpComponent} from "./driverexp/driverexp.component";
import {OwnerexpComponent} from "./ownerexp/ownerexp.component";

import {SaveexplogComponent} from "./driverexp/saveexplog/saveexplog.component";
import {ExploglistComponent} from "./driverexp/exploglist/exploglist.component";


export const ExpRoutes = [
  { path: 'driverexp', component: DriverexpComponent},
  { path: 'ownerexp', component: OwnerexpComponent},
  { path: 'driversaveexp/:usertype/:type/:id', component: SaveexplogComponent},
  { path: 'exploglist/:usertype/:id', component: ExploglistComponent}

];
