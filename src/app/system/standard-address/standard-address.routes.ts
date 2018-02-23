
import { StandardAddressComponent } from "./standard-address.component";
import {AddsystemAddressComponent} from "./addsystem-address/addsystem-address.component";

export const StandardAddressRoutes = [
    { path: '', component: StandardAddressComponent },
    { path: 'StandardAddress', component: StandardAddressComponent },
    { path: 'systemaddress', component: AddsystemAddressComponent },
];
