import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Output, Input, Attribute } from '@angular/core';
import { HighlightBalanceDirective } from '../../directives/highlightDirective';


@Component({
    selector: 'app-account-details',
    imports: [CurrencyPipe, HighlightBalanceDirective],
    template: `
        <div class="card">
           <h2>{{title}}</h2>

      <p highlight-balance> <!--TOdo: My directive to hightlith the bank balance-->
        Balance: {{ balance | currency }}
      </p>
      <p>
        Account number: {{accountNumber}}
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
    @Input() accountNumber!:number;
    @Output() closed: EventEmitter<any> = new EventEmitter();

    constructor(@Attribute('title') public title: string) { }

    close() {
        this.closed.emit()
    }
}