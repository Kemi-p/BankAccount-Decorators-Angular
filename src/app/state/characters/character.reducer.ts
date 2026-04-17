import { createReducer, on } from '@ngrx/store';
import { initialState } from './character.state';
import * as CharacterActions from './character.actions';

export const characterReducer = createReducer(
  initialState,

  on(CharacterActions.loadCharacters, (state) => ({
    ...state,
    loading: true,
  })),

  on(CharacterActions.loadCharactersSuccess, (state, { characters }) => ({
    ...state,
    characters,
    loading: false,
  })),

  on(CharacterActions.loadCharactersFailure, (state) => ({
    ...state,
    loading: false,
  }))
);