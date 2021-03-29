import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/http/auth.service';
import { SessionService } from 'ng-urxnium';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor(
    private router: Router,
    private  authService: AuthService,
    private sessionService: SessionService
  ) { }

  signOut(): void {
    this.sessionService.signOut();
    this.router.navigate(['/auth']);
  }

}
