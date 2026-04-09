export interface BankAccount {
    id: number,
    accountNumber: string;
    balance: number;
    type: 'cheque' | 'savings' | 'credit' | 'investment' | 'business';
}