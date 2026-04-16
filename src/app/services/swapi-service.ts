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
    

    getCharacters(): Observable<Person[]>{ return this.http.get<Person[]>(`https://swapi.info/api/people`)}
    getVehicles(): Observable<Vehicle[]>{ return this.http.get<Vehicle[]>(`https://swapi.info/api/vehicles`)}
    getStarships(): Observable<Starship[]>{ return this.http.get<Starship[]>(`https://swapi.info/api/starships`)}
}