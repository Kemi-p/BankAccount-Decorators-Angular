import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Output, Input, Attribute } from '@angular/core';


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
        .card {
      border: 1px solid #ad8484;
      padding: 20px;
      margin-top: 20px;
    }
  `
})
export class AccountDetails {

    @Input({ required: true }) balance!: number;
    @Output() closed: EventEmitter<any> = new EventEmitter();

    constructor(@Attribute('title') public title: string) { }

    close() {
        this.closed.emit()
    }
}