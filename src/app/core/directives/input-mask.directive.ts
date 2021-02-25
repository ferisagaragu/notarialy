import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import Inputmask from 'inputmask';

@Directive({
  selector: '[appInputMask]'
})
export class InputMaskDirective implements AfterViewInit {

  @Input() mask: any;

  constructor(private elementRef: ElementRef) { }

  ngAfterViewInit(): void {
    Inputmask.extendAliases({
      pesos: {
        suffix: ' MNX',
        groupSeparator: '.',
        alias: 'numeric',
        placeholder: '0',
        autoGroup: true,
        digits: 2,
        digitsOptional: false,
        clearMaskOnLostFocus: false,
        rightAlign: false
      }
    });
    //const inputMask = new Inputmask({ alias : 'pesos' });
    const inputMask = new Inputmask(this.mask);
    inputMask.mask(this.elementRef.nativeElement);
  }

}
