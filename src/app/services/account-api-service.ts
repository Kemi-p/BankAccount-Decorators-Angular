import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  DenoBankAccount,
  DenoFundsPayload,
  OpenDenoBankAccountPayload,
  DenoTransferPayload,
  DenoTransferResponse,
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

  withdraw(
    accountId: string,
    payload: DenoFundsPayload,
  ): Observable<DenoBankAccount> {
    return this.http.patch<DenoBankAccount>(
      `${this.baseUrl}/${accountId}/withdraw`,
      payload,
    );
  }

  transfer(payload: DenoTransferPayload): Observable<DenoTransferResponse> {
    return this.http.post<DenoTransferResponse>(
      `${this.baseUrl}/transfer`,
      payload,
    );
  }
}
