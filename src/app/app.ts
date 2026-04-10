import { Component, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AccountDetails } from "./components/account-details/account-details";
import { accounts as mockData } from './mockData'; 
import type { BankAccount } from './accountsModel';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [CurrencyPipe, AccountDetails, MatCardModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  accounts = signal<BankAccount[]>(mockData);
  
  selectedAccountId = signal<number | null>(null);

  selectedAccount = computed(() => 
    this.accounts().find(acc => acc.id === this.selectedAccountId()) || null
  );

  constructor() {
    setInterval(() => {
      this.accounts.update(currentAccounts => 
        currentAccounts.map(acc => ({
          ...acc,
          balance: acc.balance + Math.floor(Math.random() * 1000 - 500)
        }))
      );
    }, 7000);
  }

  selectAccount(account: BankAccount) {
    this.selectedAccountId.set(account.id);
  }

  closeDetails() {
    this.selectedAccountId.set(null);
  }
}