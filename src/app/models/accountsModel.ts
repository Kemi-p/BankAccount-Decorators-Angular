export interface BankAccount {
  id: number;
  title: string;
  accountNumber: string;
  balance: number;
  type: 'cheque' | 'savings' | 'credit' | 'investment' | 'business';
  active: boolean;
}

export type DenoAccountType = 'savings' | 'current' | 'fixed';
export type DenoAccountStatus = 'active' | 'frozen' | 'closed';

export interface DenoBankAccount {
  id: string;
  accountNumber: string;
  ownerName: string;
  type: DenoAccountType;
  balance: number;
  status: DenoAccountStatus;
  createdAt: string;
}

export interface OpenDenoBankAccountPayload {
  ownerName: string;
  type: DenoAccountType;
  initialDeposit?: number;
}

export interface DenoFundsPayload {
  amount: number;
  description?: string;
}

export interface DenoTransferPayload {
  fromAccountId: string;
  toAccountId: string;
  amount: number;
  description?: string;
}

export interface DenoTransferResponse {
  message: string;
  from: { id: string; balance: number };
  to: { id: string; balance: number };
  amount: number;
}
