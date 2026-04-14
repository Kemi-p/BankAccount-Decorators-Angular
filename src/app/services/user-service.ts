import { Injectable } from "@angular/core";
import { User } from "../models/userModel";

@Injectable({providedIn: 'root'})

export class UserService{
    private user: User ={
        name:'Kemi', email:'kpole@gmail.com'

    }

    getUser():User{
        return this.user
    }
}