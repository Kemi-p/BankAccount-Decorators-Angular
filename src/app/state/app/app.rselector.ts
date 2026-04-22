import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AppState } from "./app.state";

export const selectAppState =
  createFeatureSelector<AppState>('app');

export const selectUser = createSelector(
  selectAppState,
  state => state.user
);

export const selectLoans = createSelector(
  selectAppState,
  state => state.loans
);

export const selectUserLoan= createSelector(
   selectUser,
  selectLoans,
  (user, loans) => {
    if (!user) return [];
    return loans.filter(loan => loan.character === user.name);
  }
)