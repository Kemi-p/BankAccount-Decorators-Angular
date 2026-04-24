import { AsyncPipe, DatePipe, DecimalPipe, TitleCasePipe } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { firstValueFrom, Subscription } from 'rxjs';
import { SwapiService } from '../../services/swapi-service';
import { Store } from '@ngrx/store';
import * as AppActions from '../../state/app/app.actions';
import { selectUser, selectUserLoan } from '../../state/app/app.rselector';
import { Router } from '@angular/router';
import {
  DenoBankAccount,
  DenoFundsPayload,
  OpenDenoBankAccountPayload,
  DenoTransferPayload,
} from '../../models/accountsModel';
import { AccountApiService } from '../../services/account-api-service';

@Component({
  selector: 'app-client',
  imports: [AsyncPipe, DatePipe, DecimalPipe, FormsModule, TitleCasePipe],
  templateUrl: './client-portal.html',
  styleUrls: ['./client-portal.css'],
})
export class ClientPortalComponent implements OnInit, OnDestroy {
  private swapi = inject(SwapiService);
  private store = inject(Store);
  private router = inject(Router);
  private accountApi = inject(AccountApiService);
  private cdr = inject(ChangeDetectorRef);
  private userSub?: Subscription;

  vehicles$ = this.swapi.getVehicles();
  starships$ = this.swapi.getStarships();
  user$ = this.store.select(selectUser);
  loans$ = this.store.select(selectUserLoan);
  currentUserName = '';

  accounts: DenoBankAccount[] = [];
  allAccounts: DenoBankAccount[] = [];
  accountsLoading = false;
  accountsError = '';
  createAccountError = '';
  createAccountSuccess = '';
  actionError = '';
  actionSuccess = '';
  isCreateAccountModalOpen = false;
  isCreatingAccount = false;
  isTransferModalOpen = false;
  isWithdrawModalOpen = false;
  isProcessingAccountAction = false;
  selectedAccount: DenoBankAccount | null = null;

  accountForm: OpenDenoBankAccountPayload = {
    ownerName: '',
    type: 'savings',
    initialDeposit: 0,
  };

  withdrawForm: DenoFundsPayload = {
    amount: 0,
    description: '',
  };

  transferForm: DenoTransferPayload = {
    fromAccountId: '',
    toAccountId: '',
    amount: 0,
    description: '',
  };

  ngOnInit() {
    this.userSub = this.user$.subscribe((user) => {
      this.currentUserName = user?.name ?? '';

      if (!user) {
        this.accounts = [];
        this.accountForm.ownerName = '';
        this.cdr.markForCheck();
        return;
      }

      this.accountForm.ownerName = user.name;
      void this.loadAccounts(user.name);
      this.cdr.markForCheck();
    });
  }

  ngOnDestroy() {
    this.userSub?.unsubscribe();
  }

  logout() {
    this.router.navigate(['/login']);
  }

  requestLoan(assetName: string) {
    const userName = this.currentUserName;
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
    if (!this.currentUserName) {
      return;
    }

    this.createAccountError = '';
    this.createAccountSuccess = '';
    this.actionError = '';
    this.actionSuccess = '';
    this.isCreatingAccount = false;
    this.accountForm = {
      ownerName: this.currentUserName,
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

  openWithdrawModal(account: DenoBankAccount) {
    this.selectedAccount = account;
    this.actionError = '';
    this.actionSuccess = '';
    this.isProcessingAccountAction = false;
    this.withdrawForm = {
      amount: 0,
      description: `Cash withdrawal from ${account.accountNumber}`,
    };
    this.isWithdrawModalOpen = true;
  }

  closeWithdrawModal() {
    this.isWithdrawModalOpen = false;
    this.isProcessingAccountAction = false;
    this.actionError = '';
    this.selectedAccount = null;
  }

  openTransferModal(account: DenoBankAccount) {
    this.selectedAccount = account;
    this.actionError = '';
    this.actionSuccess = '';
    this.isProcessingAccountAction = false;
    this.transferForm = {
      fromAccountId: account.id,
      toAccountId: '',
      amount: 0,
      description: `Transfer from ${account.accountNumber}`,
    };
    this.isTransferModalOpen = true;
  }

  closeTransferModal() {
    this.isTransferModalOpen = false;
    this.isProcessingAccountAction = false;
    this.actionError = '';
    this.selectedAccount = null;
  }

  async createAccount() {
    const payload: OpenDenoBankAccountPayload = {
      ownerName: this.accountForm.ownerName.trim(),
      type: this.accountForm.type,
      initialDeposit: Number(this.accountForm.initialDeposit) || 0,
    };

    if (!payload.ownerName) {
      this.createAccountError = 'Character name is required.';
      return;
    }

    if (payload.initialDeposit! < 0) {
      this.createAccountError = 'Initial deposit cannot be negative.';
      return;
    }

    this.isCreatingAccount = true;
    this.createAccountError = '';
    this.createAccountSuccess = '';
    this.actionSuccess = '';

    try {
      await firstValueFrom(this.accountApi.createAccount(payload));
      this.closeCreateAccountModal();
      this.createAccountSuccess = `${payload.type} account created for ${payload.ownerName}.`;
      await this.loadAccounts(payload.ownerName);
    } catch {
      this.createAccountError =
        'Could not create the account. Make sure the Deno service is running on port 3001.';
    } finally {
      this.isCreatingAccount = false;
      this.cdr.markForCheck();
    }
  }

  trackAccount(_index: number, account: DenoBankAccount) {
    return account.id;
  }

  get transferTargets(): DenoBankAccount[] {
    if (!this.selectedAccount) {
      return [];
    }

    return this.allAccounts.filter(
      (account) =>
        account.id !== this.selectedAccount?.id && account.status === 'active',
    );
  }

  async submitWithdraw() {
    if (!this.selectedAccount) {
      return;
    }

    if (this.withdrawForm.amount <= 0) {
      this.actionError = 'Enter a withdrawal amount greater than zero.';
      return;
    }

    this.isProcessingAccountAction = true;
    this.actionError = '';
    this.actionSuccess = '';
    const sourceAccount = this.selectedAccount;

    try {
      await firstValueFrom(
        this.accountApi.withdraw(sourceAccount.id, {
          amount: Number(this.withdrawForm.amount),
          description: this.withdrawForm.description?.trim() || 'Withdrawal',
        }),
      );
      const withdrawnAmount = this.withdrawForm.amount;
      this.closeWithdrawModal();
      this.actionSuccess = `R ${withdrawnAmount.toFixed(2)} withdrawn from ${sourceAccount.accountNumber}.`;
      await this.loadAccounts(this.currentUserName);
    } catch {
      this.actionError = 'Could not withdraw funds from this account.';
    } finally {
      this.isProcessingAccountAction = false;
      this.cdr.markForCheck();
    }
  }

  async submitTransfer() {
    if (!this.selectedAccount) {
      return;
    }

    if (!this.transferForm.toAccountId) {
      this.actionError = 'Choose a destination account.';
      return;
    }

    if (this.transferForm.amount <= 0) {
      this.actionError = 'Enter a transfer amount greater than zero.';
      return;
    }

    this.isProcessingAccountAction = true;
    this.actionError = '';
    this.actionSuccess = '';
    const sourceAccount = this.selectedAccount;

    const destinationAccount = this.transferTargets.find(
      (account) => account.id === this.transferForm.toAccountId,
    );

    try {
      await firstValueFrom(
        this.accountApi.transfer({
          fromAccountId: sourceAccount.id,
          toAccountId: this.transferForm.toAccountId,
          amount: Number(this.transferForm.amount),
          description: this.transferForm.description?.trim() || 'Transfer',
        }),
      );
      const transferAmount = this.transferForm.amount;
      this.closeTransferModal();
      this.actionSuccess = `R ${transferAmount.toFixed(2)} transferred from ${sourceAccount.accountNumber} to ${destinationAccount?.ownerName ?? 'selected account'}.`;
      await this.loadAccounts(this.currentUserName);
    } catch {
      this.actionError = 'Could not complete the transfer.';
    } finally {
      this.isProcessingAccountAction = false;
      this.cdr.markForCheck();
    }
  }

  private async loadAccounts(ownerName: string) {
    this.accountsLoading = true;
    this.accountsError = '';

    try {
      const accounts = await firstValueFrom(this.accountApi.getAccounts());
      this.allAccounts = accounts;
      this.accounts = accounts.filter((account) => account.ownerName === ownerName);
    } catch {
      this.accounts = [];
      this.allAccounts = [];
      this.accountsError = 'Cant find accounts in your name, create an acc';
    } finally {
      this.accountsLoading = false;
      this.cdr.markForCheck();
    }
  }
}
