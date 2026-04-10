import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[highlight-balance]',
})
export class HighlightBalanceDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.fontWeight = 'bold';
    this.el.nativeElement.style.color = 'blue';
  }
}