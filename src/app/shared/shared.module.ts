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
import { MatNativeDateModule } from '@angular/material/core';

import { AlertComponent } from './alert/alert.component';

import { GoogleMapsSearchDirective } from '../core/directives/google-maps-search.directive';
import { GoogleMapDirective } from '../core/directives/google-map.directive';
import { InputMaskDirective } from '../core/directives/input-mask.directive';


@NgModule({
  declarations: [
    AlertComponent,
    GoogleMapsSearchDirective,
    GoogleMapDirective,
    InputMaskDirective
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
    MatNativeDateModule
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
    AlertComponent,
    GoogleMapsSearchDirective,
    GoogleMapDirective,
    InputMaskDirective
  ]
})
export class SharedModule { }
