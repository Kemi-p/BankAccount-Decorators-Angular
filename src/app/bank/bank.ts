import { Component, signal, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { AccountDetails } from '../components/account-details/account-details';
import { accounts as mockData } from '../mockData';
import { BankAccount } from '../models/accountsModel';
import { FormatBalancePipe } from '../pipes/balanceFormatPipe';
import { UpdateBalanceDirective } from '../directives/intervalsDirective';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TitleCasePipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NetWorthService } from '../services/net-worth-service';
import { UserService } from '../services/user-service';
import { User } from '../models/userModel';
import { THEME_CONFIG, ThemeConfig } from '../factory/theme-factory';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'bank',
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
  templateUrl: './bank.html',
  styleUrl: './bank.css',
})
export class BankComponent {
  accounts: BankAccount[] = mockData;
  netWorthser= inject(NetWorthService)
  userService = inject(UserService)
  themeConfig = inject(THEME_CONFIG)
  private router = inject(Router);

  navigate(path: string) {
    this.router.navigate([path]);
  }

  selectedAccountId: number | null = null;

  ngOnInit() {
    this.applyTheme();
  }

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
  
  applyTheme() {
  const body = document.body;

  if (this.themeConfig.theme === 'dark') {
    body.classList.add('dark-theme');
  } else {
    body.classList.remove('dark-theme');
  }
}

  closeDetails() {
    this.selectedAccountId = null;
  }
}
