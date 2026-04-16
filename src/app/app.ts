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
import { THEME_CONFIG, ThemeConfig } from './factory/theme-factory';
import { Router, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterLinkActive, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  private router = inject(Router);

  navigateToBank(){
    this.router.navigate(['/bank'])
  }

  navigateToClient(){
    this.router.navigate(['/client'])
  }

  navigateToLoan(){
    this.router.navigate(['/loan'])
  }
}
