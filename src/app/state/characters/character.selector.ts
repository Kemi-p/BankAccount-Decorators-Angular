import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CharacterState } from './character.state';

export const selectCharacterState =
  createFeatureSelector<CharacterState>('characters');

export const selectCharacters = createSelector(
  selectCharacterState,
  (state) => state.characters
);

export const selectLoading = createSelector(
  selectCharacterState,
  (state) => state.loading
);