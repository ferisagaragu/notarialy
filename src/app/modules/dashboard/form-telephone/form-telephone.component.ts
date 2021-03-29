import { Component } from '@angular/core';
import { UserModel } from '../../../core/models/user.model';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../../core/http/user.service';
import { MatDialog } from '@angular/material/dialog';
import { SessionService } from 'ng-urxnium';

@Component({
  selector: 'app-form-telephone',
  templateUrl: './form-telephone.component.html',
  styleUrls: ['./form-telephone.component.scss']
})
export class FormTelephoneComponent {

  user: UserModel;
  phoneNumber: FormControl;

  constructor(
    private userService: UserService,
    private dialog: MatDialog,
    private sessionService: SessionService
  ) {
    this.user = sessionService.getUser();
    this.phoneNumber = new FormControl(
      null,
      [
        Validators.required,
        Validators.pattern(
          /^\d{2}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}$/
        )
      ]
    );
  }

  save() {
    if (this.phoneNumber.invalid) {
      return;
    }

    this.user.phoneNumber = this.phoneNumber.value;

    this.userService.updateUser(this.user).subscribe(
      _ => {
        const user = this.sessionService.getUser();
        user.phoneNumber = this.phoneNumber.value;
        sessionStorage.setItem('user', JSON.stringify(user));
        this.dialog.getDialogById('formTelephone').close();
      }, _ => {
        console.log('error');
      }
    )
  }

}
