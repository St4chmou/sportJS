import { element } from 'protractor';
import { Directive, ElementRef, OnInit } from '@angular/core';

@Directive({
  selector: '[spAutofocus]'
})
export class AutofocusDirective implements OnInit{

  constructor(private _elementref: ElementRef) {
  }

  ngOnInit() {
    this._elementref.nativeElement.focus();
  }

}
