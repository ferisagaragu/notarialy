import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddressModel } from '../../../core/models/address.model';
import { ClientService } from '../../../core/http/client.service';
import { ClientModel } from '../../../core/models/client.model';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-form-client',
  templateUrl: './form-client.component.html',
  styleUrls: ['./form-client.component.scss']
})
export class FormClientComponent implements OnInit {

  @Input() stepper: MatStepper;
  @Output() saveClient: EventEmitter<ClientModel>;

  form: FormGroup;
  lat: number;
  lng: number;
  clients: Array<ClientModel>;
  filteredClients: Array<ClientModel>;
  client: ClientModel;
  clientMessageError: string;
  clientSelected: boolean;
  load: boolean;

  private address: AddressModel;

  constructor(
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    private snackBar: MatSnackBar
  ) {
    this.lat = 20.4618145;
    this.lng = -103.5118282;
    this.clientSelected = false;
    this.saveClient = new EventEmitter();
  }

  ngOnInit(): void {
    this.createForm();
    this.findAllClients();
  }

  save(): void {
    if (this.form.invalid) {
      return;
    }

    const clientValue = this.form.get('client').value;

    if (clientValue) {
      this.client = this.clients.find(client => client.name === clientValue);
      this.clientMessageError = null;
      this.saveClient.emit(this.client);
      this.stepper.next();
      return;
    }

    this.load = true;
    this.form.disable();

    this.clientService.createClient({
      ...this.form.value,
      address: `${this.address.street} ${this.address.number}${this.address.suburb ? `, ${this.address.suburb}` : ''}${this.address.postalCode ? `, ${this.address.postalCode}` : ''}`,
      city: `${this.address?.city}, ${this.address?.municipality}, ${this.address?.country}`
    }).subscribe(
      resp => {
        this.client = resp;
        this.clientMessageError = null;
        this.saveClient.emit(this.client);
        this.stepper.next();

        this.snackBar.open(
          `Has creado al cliente ${this.client.name}
          ${this.client.surname} ${this.client.motherSurname},
          si es necesario podrás modificarlo desde el menu principal`,
          'Ok',
          {
            duration: 5000,
          }
        );
      }, ({ error }) => {
        this.clientMessageError = error.message;
        this.load = false;
        this.form.enable();
      }
    );
  }

  onSelectAddress(address: AddressModel): void {
    if (address.lat) {
      this.lat = address.lat;
      this.lng = address.lng;
      this.form.get('address').setValue(address.formatted);
      this.address = address;
    }
  }

  onSelectAddressMap(address: AddressModel): void {
    this.form.get('address').setValue(address.formatted);
    this.address = address;
  }

  onBlurAddress(event: FocusEvent): void {
    if (event.target['value'] !== this.address.formatted) {
      this.form.get('address').setValue('');
    }
  }

  onSelectClient(): void {
    if (
      this.clients.find(item =>
        `${item.name} ${item.surname} ${item.motherSurname}` ===
        this.form.get('client').value
      )
    ) {
      this.form.get('name').disable();
      this.form.get('name').setValue('');
      this.form.get('surname').disable();
      this.form.get('surname').setValue('');
      this.form.get('motherSurname').disable();
      this.form.get('motherSurname').setValue('');
      this.form.get('phoneNumber').disable();
      this.form.get('phoneNumber').setValue('');
      this.form.get('address').disable();
      this.form.get('address').setValue('');
      this.clientSelected = true;
    } else {
      this.form.get('name').enable();
      this.form.get('surname').enable();
      this.form.get('motherSurname').enable();
      this.form.get('phoneNumber').enable();
      this.form.get('address').enable();
      this.form.get('address').setValue(this.address.formatted);
      this.clientSelected = false;
    }
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      client: [{ value: '', disabled: true }],
      name: ['', Validators.required],
      surname: ['', Validators.required],
      motherSurname: ['', Validators.required],
      phoneNumber: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern(
            /^\d{2}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}[- ]?\d{2}$/
          )
        ])
      ],
      address: ['', Validators.required]
    });

    this.form.get('client').valueChanges.subscribe((resp) => {
      if (resp) {
        this.filteredClients = this.clients.filter(
          company => `${company.name} ${company.surname} ${company.motherSurname}`
            .toLocaleLowerCase().includes(resp.toLocaleLowerCase())
        );
      } else {
        this.filteredClients = this.clients;
      }
    });
  }

  private findAllClients(): void {
    this.clientService.findAllClients().subscribe(
      resp => {
        this.clients = resp;
        this.filteredClients = resp;
        this.form.get('client').enable();
      }, error => { }
    );
  }

}
