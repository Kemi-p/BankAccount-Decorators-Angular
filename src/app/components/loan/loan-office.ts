import { Component, inject } from "@angular/core"
import { SwapiService } from "../../services/swapi-service";
import { toSignal } from "@angular/core/rxjs-interop";
import { LoanService } from "../../services/loan-service";

@Component({
    selector:'login',
    imports:[],
    templateUrl:'./loan-office.html',
    styleUrl:'./loan-office.css'
})

export class LoanOfficelComponent{
     private swapi = inject(SwapiService);
  private loanService = inject(LoanService);

  vehicles = toSignal(
    this.swapi.getVehicles(),
    { initialValue: [] }
  );

  starships = toSignal(
    this.swapi.getStarships(),
    { initialValue: [] }
  );

  loans = this.loanService.getLoans();

  approve(id: number) {
    this.loanService.approve(id);
  }

  reject(id: number) {
    this.loanService.reject(id);
  }

}