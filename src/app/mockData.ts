import { BankAccount } from './accountsModel';

export const accounts: BankAccount[] = [
  {
    id: 1,
    title: 'Cheque Account',
    accountNumber: '62384750192',
    balance: 1845,
    type: 'cheque',
    active: true,
  },
  {
    id: 2,
    title: 'Savings Account',
    accountNumber: '90112847364',
    balance: 5200,
    type: 'savings',
    active: true,
  },
  {
    id: 3,
    title: 'Credit Account',
    accountNumber: '4532118374920183',
    balance: 8340.2,
    type: 'credit',
    active: false,
  },
  {
    id: 4,
    title: 'Investment Account',
    accountNumber: '300948712653567',
    balance: 142875.5009,
    type: 'investment',
    active: true,
  },
  {
    id: 5,
    title: 'Business Account',
    accountNumber: '2673994366332243',
    balance: 1456224,
    type: 'business',
    active: false,
  },
];
