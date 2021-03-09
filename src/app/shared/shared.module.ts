import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSelectModule } from '@angular/material/select';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';

import { AlertComponent } from './alert/alert.component';

import { GoogleMapsSearchDirective } from '../core/directives/google-maps-search.directive';
import { GoogleMapDirective } from '../core/directives/google-map.directive';
import { InputMaskDirective } from '../core/directives/input-mask.directive';
import { DATE_FORMAT } from '../core/formats/date.format';
import { MoneyPipe } from '../core/pipes/money.pipe';
import { DateFormatPipe } from '../core/pipes/date-format.pipe';
import { MatMenuModule } from '@angular/material/menu';

@NgModule({
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE]
    },{
      provide: MAT_DATE_FORMATS,
      useValue: DATE_FORMAT
    }
  ],
  declarations: [
    AlertComponent,
    GoogleMapsSearchDirective,
    GoogleMapDirective,
    InputMaskDirective,
    MoneyPipe,
    DateFormatPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCardModule,
    MatRippleModule,
    MatMenuModule,
    MatExpansionModule,
    MatSelectModule
  ],
  exports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatDialogModule,
    MatCardModule,
    MatRippleModule,
    MatMenuModule,
    MatExpansionModule,
    MatSelectModule,
    AlertComponent,
    GoogleMapsSearchDirective,
    GoogleMapDirective,
    InputMaskDirective,
    MoneyPipe,
    DateFormatPipe
  ]
})
export class SharedModule { }
