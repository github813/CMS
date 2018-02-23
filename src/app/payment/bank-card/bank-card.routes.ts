/**
 * Created by xujianke on 2017/12/13.
 */
import {BankCardComponent} from "./bank-card.component";
import {BankCardFormComponent} from "./bank-card-form/bank-card-form.component";

export const BankCardRoutes = [
  { path: '', component: BankCardComponent},
  { path: 'form', component: BankCardFormComponent}
];
