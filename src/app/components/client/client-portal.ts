import { Component, inject, Pipe } from '@angular/core';
import { SwapiService, Vehicle, Starship } from '../../services/swapi-service';
import { Store } from '@ngrx/store';
import * as AppActions from '../../state/app/app.actions';
import { toSignal } from '@angular/core/rxjs-interop';
import { selectUser, selectUserLoan } from '../../state/app/app.rselector';
import { AsyncPipe } from '@angular/common';
import { Router } from '@angular/router';
import {MatChipsModule} from '@angular/material/chips';

@Component({
  selector: 'app-client',
  imports:[AsyncPipe,MatChipsModule],
  templateUrl: './client-portal.html',
  styleUrls: ['./client-portal.css'],
})
export class ClientPortalComponent {
  private swapi = inject(SwapiService);
  private store = inject(Store);
  private router = inject(Router)

  vehicles = toSignal(this.swapi.getVehicles(), { initialValue: [] });
  starships = toSignal(this.swapi.getStarships(), { initialValue: [] });

  user$ = this.store.select(selectUser);
  loans$ = this.store.select(selectUserLoan)
  
 logout() {
  this.router.navigate(['/login']);
}
  requestLoan(assetName: string) {
    let userName = '';

    this.user$.subscribe(u => userName = u?.name || '');

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
}