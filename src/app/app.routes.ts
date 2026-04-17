import { Routes } from '@angular/router';
import { ClientPortalComponent } from './components/client/client-portal';
import { LoanOfficelComponent } from './components/loan/loan-office';
import { App } from './app';
import { BankComponent } from './bank/bank';
import { LoginComponent } from './login/login';
import { bankeGuard } from './routeGuards/role-guard';
import { clientGuard } from './routeGuards/clientRole-guard';

export const routes: Routes = [
    {path:'home', component: App },
    {path:'client', component:ClientPortalComponent, canActivate:[clientGuard]},
    {path:'loan', component: LoanOfficelComponent, canActivate: [bankeGuard]},
    {path:'bank', component: BankComponent },
    {path: 'login', component:LoginComponent},
    { path: '', redirectTo: 'login', pathMatch: 'full' },
];
