import { Component, inject } from "@angular/core"
import { SwapiService, Person } from "../../services/swapi-service"
import { CommonModule } from "@angular/common";

@Component({
    selector:'login',
    imports:[CommonModule],
    templateUrl:'./client-portal.html',
    styleUrl:'./client-portal.css'
})

export class ClientPortalComponent{
    private swapi= inject(SwapiService)

    characters: Person[] = [];

  constructor() {
    this.swapi.getCharacters().subscribe(data => {
      this.characters = data.slice(0, 20);
    });
  }
}