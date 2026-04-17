import { Action, createReducer, on } from "@ngrx/store";
import * as AppActions from '../../state/app/app.actions'
import { AppState } from "./app.state";

export const initialState: AppState={
    user: null,
    loans: []
}

export const appReducer = createReducer(
    initialState,
    on(AppActions.setUser, (state, {user}) => ({
        ...state,
        user
    })),
    on(AppActions.createLoan, (state, {loan}) => ({
        ...state,
        loans: [...state.loans,loan]
    })),

)