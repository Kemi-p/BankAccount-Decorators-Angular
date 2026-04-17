import { Component, inject } from "@angular/core";
import { Person, SwapiService } from "../services/swapi-service";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { toSignal } from "@angular/core/rxjs-interop";
import * as AppActions from '../state/app/app.actions'
import {FormsModule} from '@angular/forms'


@Component({
    selector:'login',
    imports:[FormsModule],
    templateUrl:'./login.html',
    styleUrl:'./login.css'
})


export class LoginComponent {
     swapi = inject(SwapiService);
     router = inject(Router)
     store = inject(Store)

     characters = toSignal(this.swapi.getCharacters(), { initialValue: [] });

  selectedCharacter: Person | null = null;
  selectedRole: 'client' | 'banker' | null = null;

  login() {
    if (!this.selectedCharacter || !this.selectedRole) return;

    this.store.dispatch(
      AppActions.setUser({
        user: {
          name: this.selectedCharacter.name,
          role: this.selectedRole,
        },
      })
    );

    this.router.navigate([this.selectedRole === 'banker' ? '/loan' : '/client']);
  }

}