export interface BankAccount {
  id: number;
  title: string;
  accountNumber: string;
  balance: number;
  type: 'cheque' | 'savings' | 'credit' | 'investment' | 'business';
  active: boolean;
}
