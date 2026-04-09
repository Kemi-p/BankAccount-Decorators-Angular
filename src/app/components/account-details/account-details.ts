import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Output,Input  } from '@angular/core';


@Component({
  selector: 'app-account-details',
  imports: [CurrencyPipe],
  template: `
        <div class="card">
           

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

      close(){
        this.closed.emit()
      }
}