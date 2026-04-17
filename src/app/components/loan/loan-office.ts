import { Component, inject } from "@angular/core"
import { SwapiService } from "../../services/swapi-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { LoanService } from "../../services/loan-service";
import * as AppActions from '../../state/app/app.actions'
import { Store } from "@ngrx/store";
import { selectLoans, selectUser } from "../../state/app/app.rselector";
import { AsyncPipe } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector:'login',
    imports:[AsyncPipe],
    templateUrl:'./loan-office.html',
    styleUrl:'./loan-office.css'
})

export class LoanOfficelComponent{
   private store = inject(Store);
    private router = inject(Router)
logout() {
  this.router.navigate(['/login']);
}
  loans$ = this.store.select(selectLoans);
  user$ = this.store.select(selectUser);

  approve(id: number) {
    this.store.dispatch(AppActions.aproveLoan({ id }));
  }

  reject(id: number) {
    this.store.dispatch(AppActions.rejectLoan({ id }));
  }

}