import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SessionService, SweetAlert2Service } from 'ng-urxnium';
import { UserModel } from '../../../core/models/user.model';
import { UserService } from '../../../core/http/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-user',
  templateUrl: './form-user.component.html',
  styleUrls: ['./form-user.component.scss']
})
export class FormUserComponent implements OnInit {

  form: FormGroup;
  user: UserModel;

  constructor(
    private formBuilder: FormBuilder,
    private session: SessionService,
    private userService: UserService,
    private snack: MatSnackBar,
    private swal: SweetAlert2Service
  ) {
    this.user = session.getUser() as UserModel;
  }

  ngOnInit(): void {
    this.createForm();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    this.userService.updateUser({
      uuid: this.user.uuid,
      ...this.form.value
    }).subscribe(_ => {
        const { name, surname, motherSurname, phoneNumber } = this.form.value;

        this.user.name = name;
        this.user.surname = surname;
        this.user.motherSurname = motherSurname;
        this.user.phoneNumber = phoneNumber;
        localStorage.setItem('user', JSON.stringify(this.user));

        this.snack.open(
          '¡Bien! se han guardado tus datos con éxito',
          'Ok',
          {
            duration: 5000
          }
        );
      }, _ => {
        this.swal.fire({
          icon: 'error',
          title: 'Upps hubo un erro al actualizar los datos de usuario',
          text: 'Lamentamos los inconvenientes, por favor inténtalo mas tarde.',
          confirmButtonText: 'Entiendo',
          theme: 'material'
        });
      }
    )
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: [{ value: this.user.email, disabled: true}],
      name: [this.user.name, Validators.required],
      surname: [this.user.surname, Validators.required],
      motherSurname: [this.user.motherSurname, Validators.required],
      phoneNumber: [
        this.user.phoneNumber,
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^\d{2}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}$/
          )
        ])
      ]
    });
  }

}
