import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, Input, Attribute } from '@angular/core';
import { HighlightBalanceDirective } from '../../directives/highlightDirective';
import { FormatBalancePipe } from '../../pipes/balanceFormatPipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-account-details',
  imports: [
    HighlightBalanceDirective,
    FormatBalancePipe,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
  ],
  template: `
    <mat-card class="details-card" appearance="outlined">
      <mat-card-header>
        <mat-icon mat-card-avatar>account_balance</mat-icon>
        <mat-card-title>{{ title }}</mat-card-title>
        <mat-card-subtitle>Account Overview</mat-card-subtitle>
      </mat-card-header>

      <mat-divider></mat-divider>

      <mat-card-content class="details-content">
        <div class="detail-row">
          <span class="label">Balance</span>
          <span class="value balance" highlight-balance>
            {{ balance | formatBalance: 'R' }}
          </span>
        </div>
        <div class="detail-row">
          <span class="label">Account Number</span>
          <span class="value">{{ accountNumber }}</span>
        </div>
      </mat-card-content>

      <mat-card-actions align="end">
        <button mat-stroked-button color="warn" (click)="close()">
          <mat-icon>close</mat-icon>
          Close
        </button>
      </mat-card-actions>
    </mat-card>
  `,
  styles: `
    .details-card {
      margin-top: 24px;
      max-width: 420px;
    }

    .details-content {
      padding: 16px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .label {
      color: var(--mat-sys-on-surface-variant);
      font-size: 0.875rem;
    }

    .value {
      font-weight: 500;
    }

    .balance {
      font-size: 1.1rem;
    }

    mat-divider {
      margin: 0;
    }
  `,
})
export class AccountDetails {
  @Input({ required: true }) balance!: number;
  @Input() accountNumber!: string;
  @Output() closed: EventEmitter<any> = new EventEmitter();
  title!: string;
  constructor(@Attribute('title') title: string) {
    this.title = title || 'Account Details';
  }

  close() {
    this.closed.emit();
  }
}
