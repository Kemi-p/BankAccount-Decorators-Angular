import { DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Starship, SwapiService, Vehicle } from '../../services/swapi-service';
import { Store } from '@ngrx/store';
import * as AppActions from '../../state/app/app.actions';
import { selectUser, selectUserLoan } from '../../state/app/app.rselector';
import { Router } from '@angular/router';
import {
  DenoBankAccount,
  OpenDenoBankAccountPayload,
} from '../../models/accountsModel';
import { AccountApiService } from '../../services/account-api-service';
import { AppState, Loan } from '../../state/app/app.state';

@Component({
  selector: 'app-client',
  imports: [DatePipe, DecimalPipe, FormsModule, TitleCasePipe],
  templateUrl: './client-portal.html',
  styleUrls: ['./client-portal.css'],
})
export class ClientPortalComponent implements OnInit, OnDestroy {
  private swapi = inject(SwapiService);
  private store = inject(Store);
  private router = inject(Router);
  private accountApi = inject(AccountApiService);
  private cdr = inject(ChangeDetectorRef);
  private subscriptions = new Subscription();
  private accountsLoadSub?: Subscription;
  private createAccountSub?: Subscription;

  vehicles: Vehicle[] = [];
  starships: Starship[] = [];
  user: AppState['user'] = null;
  loans: Loan[] = [];

  accounts: DenoBankAccount[] = [];
  accountsLoading = false;
  accountsError = '';
  createAccountError = '';
  createAccountSuccess = '';
  isCreateAccountModalOpen = false;
  isCreatingAccount = false;

  accountForm: OpenDenoBankAccountPayload = {
    ownerName: '',
    type: 'savings',
    initialDeposit: 0,
  };

  ngOnInit() {
    this.subscriptions.add(
      this.swapi.getVehicles().subscribe({
        next: (vehicles) => {
          this.vehicles = vehicles;
          this.cdr.markForCheck();
        },
      }),
    );

    this.subscriptions.add(
      this.swapi.getStarships().subscribe({
        next: (starships) => {
          this.starships = starships;
          this.cdr.markForCheck();
        },
      }),
    );

    this.subscriptions.add(
      this.store.select(selectUser).subscribe((user) => {
        this.user = user;

        if (!user) {
          this.accounts = [];
          this.cdr.markForCheck();
          return;
        }

        this.accountForm.ownerName = user.name;
        this.loadAccounts(user.name);
        this.cdr.markForCheck();
      }),
    );

    this.subscriptions.add(
      this.store.select(selectUserLoan).subscribe((loans) => {
        this.loans = loans;
        this.cdr.markForCheck();
      }),
    );
  }

  ngOnDestroy() {
    this.accountsLoadSub?.unsubscribe();
    this.createAccountSub?.unsubscribe();
    this.subscriptions.unsubscribe();
  }

  logout() {
    this.router.navigate(['/login']);
  }

  requestLoan(assetName: string) {
    const userName = this.user?.name;
    if (!userName) {
      return;
    }

    this.store.dispatch(
      AppActions.createLoan({
        loan: {
          id: Date.now(),
          character: userName,
          asset: assetName,
          status: 'pending',
        },
      })
    );
  }

  openCreateAccountModal() {
    const currentUser = this.user;
    if (!currentUser) {
      return;
    }

    this.createAccountError = '';
    this.createAccountSuccess = '';
    this.isCreatingAccount = false;
    this.accountForm = {
      ownerName: currentUser.name,
      type: 'savings',
      initialDeposit: 0,
    };
    this.isCreateAccountModalOpen = true;
  }

  closeCreateAccountModal() {
    this.isCreateAccountModalOpen = false;
    this.createAccountError = '';
    this.isCreatingAccount = false;
  }

  createAccount() {
    const payload: OpenDenoBankAccountPayload = {
      ownerName: this.accountForm.ownerName.trim(),
      type: this.accountForm.type,
      initialDeposit: Number(this.accountForm.initialDeposit) || 0,
    };

    if (payload.initialDeposit! < 0) {
      this.createAccountError = 'Initial deposit cannot be negative.';
      return;
    }

    this.isCreatingAccount = true;
    this.createAccountError = '';
    this.createAccountSuccess = '';

    this.createAccountSub?.unsubscribe();
    this.createAccountSub = this.accountApi.createAccount(payload).subscribe({
      next: () => {
        this.isCreatingAccount = false;
        this.closeCreateAccountModal();
        this.createAccountSuccess = `${payload.type} account created for ${payload.ownerName}.`;

        if (this.user?.name) {
          this.loadAccounts(this.user.name);
        }

        this.cdr.markForCheck();
      },
      error: () => {
        this.createAccountError =
          'Could not create the account. Make sure the Deno service is running on port 3001.';
        this.isCreatingAccount = false;
        this.cdr.markForCheck();
      },
    });

    this.subscriptions.add(this.createAccountSub);
  }

  trackAccount(_index: number, account: DenoBankAccount) {
    return account.id;
  }

  private loadAccounts(ownerName: string) {
    this.accountsLoadSub?.unsubscribe();
    this.accountsLoading = true;
    this.accountsError = '';

    this.accountsLoadSub = this.accountApi.getAccounts().subscribe({
      next: (accounts) => {
        this.accounts = accounts.filter(
          (account) => account.ownerName === ownerName,
        );
        this.accountsLoading = false;
        this.cdr.markForCheck();
      },
      error: () => {
        this.accounts = [];
        this.accountsError = 'Cant find accounts in your name, create an acc';
        this.accountsLoading = false;
        this.cdr.markForCheck();
      },
    });

    this.subscriptions.add(this.accountsLoadSub);
  }
}
