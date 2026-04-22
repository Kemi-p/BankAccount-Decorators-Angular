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
    getCharacters(): Observable<Person[]>{ return this.http.get<Person[]>(`http://localhost:3000/swapi/characters`)}
    getVehicles(): Observable<Vehicle[]>{ return this.http.get<Vehicle[]>(`http://localhost:3000/swapi/vehicles`)}
    getStarships(): Observable<Starship[]>{ return this.http.get<Starship[]>(`http://localhost:3000/swapi/starships`)}
}