import { createAction, props } from '@ngrx/store';
import { Person } from '../../services/swapi-service';

export const loadCharacters = createAction('[Characters] Load');

export const loadCharactersSuccess = createAction(
  '[Characters] Load Success',
  props<{ characters: Person[] }>()
);

export const loadCharactersFailure = createAction(
  '[Characters] Load Failure'
);