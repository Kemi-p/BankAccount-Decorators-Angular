import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import type {BankAccount} from './accountsModel'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BankAccount-Decorators-Angular');

  accounts: BankAccount[] = [
    {
      id: 1,
      accountNumber: '62384750192',
      balance: 1845,
      type: 'cheque',
    },
    {
      id: 2,
      accountNumber: '90112847364',
      balance: 5200,
      type: 'savings',
    },
    {
      id: 3,
      accountNumber: '4532118374920183',
      balance: 8340.20,
      type: 'credit',
    },
    {
      id: 4,
      accountNumber: '300948712653567',
      balance: 142875.50,
      type: 'investment',
    },
     {
      id: 5,
      accountNumber: '2673994366332243',
      balance: 1456224,
      type: 'business',
    },
  ];

}