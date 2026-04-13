import { Component, signal, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AccountDetails } from './components/account-details/account-details';
import { accounts as mockData } from './mockData';
import type { BankAccount } from './models/accountsModel';
import { FormatBalancePipe } from './pipes/balanceFormatPipe';
import { UpdateBalanceDirective } from './directives/intervalsDirective';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NetWorthService } from './services/net-worth-service';
import { UserService } from './services/user-service';
import { User } from './models/userModel';
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
  netWorthser= inject(NetWorthService)
  userService = inject(UserService)

  selectedAccountId: number | null = null;

  currentUser:User = this.userService.getUser()

  get selectedAccount(): BankAccount | null {
    return this.accounts.find((acc) => acc.id === this.selectedAccountId) || null;
  }

  selectAccount(account: BankAccount) {
    this.selectedAccountId = account.id;
  }


  get netWorth() : number {
    return this.netWorthser.calcNetWorth(this.accounts)
  }
  closeDetails() {
    this.selectedAccountId = null;
  }
}
