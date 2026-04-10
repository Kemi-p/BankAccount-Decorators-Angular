import { Component, signal } from '@angular/core';
import type {BankAccount} from './accountsModel'
import { CommonModule, CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { AccountDetails } from "./components/account-details/account-details";

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe, AccountDetails, NgFor,NgIf,CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BankAccount-Decorators-Angular');

  accounts: BankAccount[] = [
    {
      id: 1,
      title: 'Cheque Account',
      accountNumber: '62384750192',
      balance: 1845,
      type: 'cheque',
    },
    {
      id: 2,
      title: 'Savings Account',
      accountNumber: '90112847364',
      balance: 5200,
      type: 'savings',
    },
    {
      id: 3,
      title: 'Credit Account',
      accountNumber: '4532118374920183',
      balance: 8340.20,
      type: 'credit',
    },
    {
      id: 4,
      title: 'Investment Account',
      accountNumber: '300948712653567',
      balance: 142875.50,
      type: 'investment',
    },
     {
      id: 5,
      title: 'Business Account',
      accountNumber: '2673994366332243',
      balance: 1456224,
      type: 'business',
    },
  ];

  selectedAccount: any = null;

  constructor() {
   
    setInterval(() => {
      this.accounts.forEach(acc => {
        acc.balance += Math.floor(Math.random() * 1000 - 500);
      });
    }, 3000);
  }

  selectAccount(account: any) {
    this.selectedAccount = account;
  }

  closeDetails() {
    this.selectedAccount = null;
  }

}