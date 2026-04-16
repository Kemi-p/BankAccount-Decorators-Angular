import { Injectable, signal } from '@angular/core';
import { LoanRequest } from '../models/loanModel';

const mockLoans: LoanRequest[] = [
  {
    id: 1,
    characterName: 'Luke Skywalker',
    characterUrl: 'https://swapi.info/api/people/1',
    assetName: 'X-wing',
    assetType: 'starship',
    assetUrl: 'https://swapi.info/api/starships/12',
    amount: 149999,
    status: 'pending',
    date: '2024-03-01',
  },
  {
    id: 2,
    characterName: 'Han Solo',
    characterUrl: 'https://swapi.info/api/people/14',
    assetName: 'Millennium Falcon',
    assetType: 'starship',
    assetUrl: 'https://swapi.info/api/starships/10',
    amount: 1500000,
    status: 'pending',
    date: '2024-03-05',
  },
  {
    id: 3,
    characterName: 'Rey',
    characterUrl: 'https://swapi.info/api/people/85',
    assetName: 'Snowspeeder',
    assetType: 'vehicle',
    assetUrl: 'https://swapi.info/api/vehicles/14',
    amount: 45000,
    status: 'approved',
    date: '2024-02-20',
  },
];

@Injectable({ providedIn: 'root' })
export class LoanService {
  private loans = signal<LoanRequest[]>(mockLoans);

  getLoans(): LoanRequest[] {
    return this.loans();
  }

  getLoansByCharacter(characterName: string): LoanRequest[] {
    return this.loans().filter(l => l.characterName === characterName);
  }

  submit(loan: Omit<LoanRequest, 'id' | 'status' | 'date'>): void {
    const newLoan: LoanRequest = {
      ...loan,
      id: this.loans().length + 1,
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
    };
    this.loans.update(loans => [...loans, newLoan]);
  }

  approve(id: number): void {
    this.loans.update(loans =>
      loans.map(l => l.id === id ? { ...l, status: 'approved' } : l)
    );
  }

  reject(id: number): void {
    this.loans.update(loans =>
      loans.map(l => l.id === id ? { ...l, status: 'rejected' } : l)
    );
  }
}