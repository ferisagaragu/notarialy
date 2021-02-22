import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';
import { AddressModel } from '../models/address.model';
declare var google: any;

@Directive({
  selector: '[appGoogleMapsSearch]'
})
export class GoogleMapsSearchDirective implements AfterViewInit {

  @Output() selectAddress: EventEmitter<AddressModel>;
  @Output() validAddress: EventEmitter<boolean>;

  private validate: boolean;

  constructor(private elementRef: ElementRef) {
    this.selectAddress = new EventEmitter<any>();
    this.validAddress = new EventEmitter<boolean>();
    this.validate = true;
  }

  ngAfterViewInit(): void {
    this.getPlaceAutocomplete();
  }

  private getPlaceAutocomplete() {
    const autocomplete = new google.maps.places.Autocomplete(
      this.elementRef.nativeElement,
      {
        componentRestrictions: { country: 'MX' },
        types: ['address']
      }
    );

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      const place = autocomplete.getPlace();
      this.selectAddress.emit(new AddressModel(place));

      if (!this.validate) {
        this.validAddress.emit(true);
        this.validate = true;
      }
    });

    this.elementRef.nativeElement.addEventListener('keyup', (event) => {
      if (this.validate) {
        this.validAddress.emit(false);
        this.validate = false;
      }
    });
  }

}
