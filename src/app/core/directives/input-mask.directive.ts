import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import Inputmask from 'inputmask';
import { PESOS_FORMAT } from '../formats/pesos.format';

@Directive({
  selector: '[appInputMask]'
})
export class InputMaskDirective implements AfterViewInit {

  @Input() mask: any;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    Inputmask.extendAliases({
      pesos: PESOS_FORMAT
    });

    const inputMask = new Inputmask(this.mask);
    inputMask.mask(this.elementRef.nativeElement);
  }

}
