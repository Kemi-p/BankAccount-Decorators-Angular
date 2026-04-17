import { createAction , props} from "@ngrx/store";
import { Loan } from "./app.state";


export const setUser = createAction(
    '[User] Set User',
    props<{user: {name: string, role: 'client' | 'banker'}}>()
);

export const createLoan = createAction(
    '[Loan] Create', 
    props<{loan: Loan}>()
)

export const aproveLoan = createAction(
    '[Loan] Approve', 
    props<{id: number}>()
)

export const rejectLoan = createAction(
    '[Loan] Reject', 
    props<{id: number}>()
)