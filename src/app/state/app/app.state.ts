export interface Loan{
    id: number,
    character:  string,
    asset: string,
    status: 'pending' | 'approved' | 'rejected'
}

export interface AppState{
    user: { name: string; role: 'client' | 'banker' } | null;
    loans: Loan[];
}