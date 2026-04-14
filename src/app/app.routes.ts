import { Routes } from '@angular/router';
import { ClientPortalComponent } from './components/client/client-portal';
import { LoanOfficelComponent } from './components/loan/loan-office';
import { App } from './app';

export const routes: Routes = [
    { path: 'home', component: App },
    {path:'client', component:ClientPortalComponent},
    {path:'banker', component: LoanOfficelComponent},
    { path: '', redirectTo: 'client', pathMatch: 'full' },
];
