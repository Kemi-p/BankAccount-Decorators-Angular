import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DenoBankAccount,
  OpenDenoBankAccountPayload,
} from '../models/accountsModel';

@Injectable({ providedIn: 'root' })
export class AccountApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:3001/accounts';

  getAccounts(): Observable<DenoBankAccount[]> {
    return this.http.get<DenoBankAccount[]>(this.baseUrl);
  }

  createAccount(
    payload: OpenDenoBankAccountPayload,
  ): Observable<DenoBankAccount> {
    return this.http.post<DenoBankAccount>(this.baseUrl, payload);
  }
}
