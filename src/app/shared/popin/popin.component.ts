import { element } from 'protractor';
import { Observable } from 'rxjs/Observable';
import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'sp-popin',
  templateUrl: './popin.component.html',
  styleUrls: ['./popin.component.scss']
})
export class PopinComponent implements OnInit {

  @ViewChild('popin') popin: ElementRef;

  @Output() exit = new EventEmitter<void>();

  constructor(private renderer: Renderer2, private elementRef: ElementRef) { }

  ngOnInit() {
    this.renderer.listen(this.popin.nativeElement, 'click', (e: Event) => {
      e.stopPropagation();
    });

    this.renderer.listen(this.elementRef.nativeElement, 'click', (e: Event) => {
      this.exit.emit();
    });

    this.renderer.listen(document, 'keydown.escape', (e: KeyboardEvent) => {
      this.exit.emit();
    });
  }

}
