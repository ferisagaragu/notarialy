import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatStepperModule } from '@angular/material/stepper';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AlertComponent } from './alert/alert.component';
import { GoogleMapsSearchDirective } from '../core/directives/google-maps-search.directive';
import { GoogleMapDirective } from '../core/directives/google-map.directive';

@NgModule({
  declarations: [
    AlertComponent,
    GoogleMapsSearchDirective,
    GoogleMapDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  exports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatStepperModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSnackBarModule,
    AlertComponent,
    GoogleMapsSearchDirective,
    GoogleMapDirective
  ]
})
export class SharedModule { }
