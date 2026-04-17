import { CanActivateFn } from '@angular/router';
import { inject, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { selectUser } from './state/app/app.rselector';
import { map } from 'rxjs/operators';

export const bankeGuard: CanActivateFn = () => {
  const store = inject(Store)
  const router = inject(Router)

   return store.select(selectUser).pipe(
    map(user => {
      if (user?.role === 'banker') return true;

      router.navigate(['/login']);
      return false;
    })
  );
};
