import { DriverExpGetComponent } from "./driver-exp-get/driver-exp-get.component";
import { OwnerExpGetComponent } from "./owner-exp-get/owner-exp-get.component";
import { ExpAddComponent } from "./exp-add/exp-add.component";

export const ExpGetRoutes = [
    { path: 'driverExpGet', component: DriverExpGetComponent },
    { path: 'ownerExpGet', component: OwnerExpGetComponent },
    { path: 'expAdd',component: ExpAddComponent }
];
