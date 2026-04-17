import { Component, inject } from "@angular/core"
import { SwapiService, Person } from "../../services/swapi-service"
import { CommonModule } from "@angular/common";
import * as CharacterActions from '../../state/characters/character.actions'
import * as CharacterSelectors from '../../state/characters/character.selector'
import { Store } from "@ngrx/store";
@Component({
    selector:'login',
    imports:[CommonModule],
    templateUrl:'./client-portal.html',
    styleUrl:'./client-portal.css'
})

export class ClientPortalComponent{
   private store = inject(Store);
  private swapi = inject(SwapiService);

  characters$ = this.store.select(CharacterSelectors.selectCharacters);
  loading$ = this.store.select(CharacterSelectors.selectLoading);

  ngOnInit() {
    this.store.dispatch(CharacterActions.loadCharacters());

    this.swapi.getCharacters().subscribe({
      next: (data) => {
        this.store.dispatch(
          CharacterActions.loadCharactersSuccess({
            characters: data
          })
        );
      },
      error: () => {
        this.store.dispatch(CharacterActions.loadCharactersFailure());
      }
    });
  }
}