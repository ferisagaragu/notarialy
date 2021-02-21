import { AfterViewInit, Directive, ElementRef, EventEmitter, Output } from '@angular/core';
declare var google: any;

@Directive({
  selector: '[appGoogleMapsSearch]'
})
export class GoogleMapsSearchDirective implements AfterViewInit {

  @Output() selectAddress: EventEmitter<any>;

  constructor(private elementRef: ElementRef) {
    this.selectAddress = new EventEmitter<any>();
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
      console.log(autocomplete.getPlace());
      this.selectAddress.emit(autocomplete.getPlace());
    });
  }

}
