import { Component, signal } from '@angular/core';
import type {BankAccount} from './accountsModel'

@Component({
  selector: 'app-root',
  imports: [],
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

}