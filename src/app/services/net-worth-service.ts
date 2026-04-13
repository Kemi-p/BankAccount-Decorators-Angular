import { Injectable } from "@angular/core";
import { BankAccount } from "../models/accountsModel";

@Injectable({providedIn:'root'})

export class NetWorthService{
    calcNetWorth(accounts:BankAccount[]):number{
        return accounts.filter(acc => acc.active).reduce((total, acc) =>total + acc.balance,0 )
    }
}