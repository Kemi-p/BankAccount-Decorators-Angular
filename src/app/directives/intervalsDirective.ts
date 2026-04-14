import { Directive, Input, OnInit, OnDestroy } from '@angular/core';
import { BankAccount } from '../models/accountsModel';

@Directive({
  selector: '[updateBalance]',
})
export class UpdateBalanceDirective implements OnInit, OnDestroy {
  @Input() updateBalance!: BankAccount[];

  private intervalId: ReturnType<typeof setInterval> | undefined;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.updateBalance.forEach((acc) => {
        acc.balance += Math.floor(Math.random() * 1000 - 500);
      });
    }, 7000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
