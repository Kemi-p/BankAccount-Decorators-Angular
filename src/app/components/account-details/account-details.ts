import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Output,Input, Attribute  } from '@angular/core';


@Component({
  selector: 'app-account-details',
  imports: [CurrencyPipe],
  template: `
        <div class="card">
           <h2>{{title}}</h2>

      <p BalanceHighlight> <!--TOdo: My directive to hightlith the bank balance-->
        Balance: {{ balance | currency }}
      </p>

      <button (click)="close()">Close</button>


        </div>
  `,
  styles: `
  `
})
export class AccountDetails {

    @Input({ required: true }) balance!: number;
    @Output() closed: EventEmitter<any> = new EventEmitter();

    constructor(@Attribute('title') public title: string) {}

      close(){
        this.closed.emit()
      }
}