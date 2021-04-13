import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService, SweetAlert2Service } from 'ng-urxnium';
import { QuoteService } from '../../core/http/quote.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  private warning: boolean;

  constructor(
    private router: Router,
    private sessionService: SessionService,
    private quoteService: QuoteService,
    private swal: SweetAlert2Service
  ) {
    this.warning = false;

    this.onWarning();
  }

  signOut(): void {
    this.sessionService.signOut();
    this.router.navigate(['auth']);
  }

  goHome(): void {
    if (this.warning) {
      this.swal.fire({
        icon: 'warning',
        title: '¿Seguro que quieres abanar el presupuesto?',
        text: 'Aun tienes artículos sin guardar, si abandonas el presupuesto la información no guardada se perderá.',
        showCancelButton: true,
        theme: 'material'
      }).subscribe(resp => {
        if (resp) {
          this.warning = false;
          this.router.navigate(['dashboard']);
        }
      });
    } else {
      this.router.navigate(['dashboard']);
    }
  }

  private onWarning(): void {
    this.quoteService.onWarning.subscribe(resp => {
      this.warning = resp;
    });
  }

}
