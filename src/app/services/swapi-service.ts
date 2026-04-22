import { inject, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

export interface Person {
  name: string;
  gender:string,
  url: string;
}

export interface Vehicle {
  name: string;
  url: string;
  model: string;
  cost_in_credits: string;
}

export interface Starship {
  name: string;
  url: string;
  model: string;
  cost_in_credits: string;
}

@Injectable({providedIn: 'root'})

export class SwapiService {
    private http= inject(HttpClient)
     base= 'http://localhost:3000/swapi'
    getCharacters(): Observable<Person[]>{ return this.http.get<Person[]>(`${this.base}/characters`)}
    getVehicles(): Observable<Vehicle[]>{ return this.http.get<Vehicle[]>(`${this.base}/vehicles`)}
    getStarships(): Observable<Starship[]>{ return this.http.get<Starship[]>(`${this.base}/starships`)}
}