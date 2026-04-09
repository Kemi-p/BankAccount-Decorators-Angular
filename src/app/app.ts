import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('BankAccount-Decorators-Angular');

  accounts = [
    {id:1, name:'Cheque', balance:1756},
     {id:2, name:'Savings', balance:1756},
      {id:3, name:'Fixed deposit', balance:1756},
       {id:4, name:'Credit', balance:1756},
        {id:5, name:'Business', balance:1756}
  ]
}
