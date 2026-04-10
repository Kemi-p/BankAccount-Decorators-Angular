import { Component, signal, computed } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AccountDetails } from './components/account-details/account-details';
import { accounts as mockData } from './mockData';
import type { BankAccount } from './accountsModel';
import { FormatBalancePipe } from './pipes/balanceFormatPipe';
import { UpdateBalanceDirective } from './directives/intervalsDirective';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [
    FormatBalancePipe,
    UpdateBalanceDirective,
    AccountDetails,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    TitleCasePipe,
    MatIconModule,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  accounts: BankAccount[] = mockData;

  selectedAccountId: number | null = null;

  get selectedAccount(): BankAccount | null {
    return this.accounts.find((acc) => acc.id === this.selectedAccountId) || null;
  }

  selectAccount(account: BankAccount) {
    this.selectedAccountId = account.id;
  }

  closeDetails() {
    this.selectedAccountId = null;
  }
}
