import { Component } from '@angular/core';
import { AuthService } from '../../../core/http/auth.service';
import { Router } from '@angular/router';
import { SignInWindowService, SweetAlert2Service, SessionService } from 'ng-urxnium';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  loadOutlook: boolean;
  loadGoogle: boolean;

  constructor(
    private authService: AuthService,
    private router: Router,
    private swal: SweetAlert2Service,
    private signInWindowService: SignInWindowService,
    private sessionService: SessionService
  ) {
    this.loadOutlook = false;
    this.loadGoogle = false;
  }

  signInWhitCode(event: MouseEvent, type: 'Outlook' | 'Google') {
    this.setLoad(true, type);

    this.authService.generateAuthenticationUrl(type).subscribe(link => {
        this.signInWindowService.open(link, event).subscribe(code => {
          this.authService.signInFormCode(code, type).subscribe(resp => {
              const session = resp.session;
              this.sessionService.signIn(session, resp);
              this.setLoad(false, type);

              this.router.navigate(['/dashboard']);
            }, error => {
              this.alertError(error.message);
              this.setLoad(false, type);
            }
          );
        }, _ => {
          this.setLoad(false, type);
        });
      }, error => {
        this.alertError(error.message);
        this.setLoad(false, type);
      }
    )
  }

  private alertError(message: string): void {
    this.swal.fire({
      icon: 'error',
      title: message,
      text:
        'Hubo un error al iniciar sesión. ' +
        'Lamentamos los inconvenientes inténtalo mas tarde.',
      theme: 'material'
    });
  }

  private setLoad(status: boolean, type: 'Outlook' | 'Google') {
    if (type === 'Outlook') {
      this.loadOutlook = status;
    } else {
      this.loadGoogle = status;
    }
  }

}
