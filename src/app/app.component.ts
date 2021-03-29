import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/http/auth.service';
import { environment } from '../environments/environment';
import { SessionService } from 'ng-urxnium';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isSignIn: boolean;

  constructor(
    private authService: AuthService,
    private sessionService: SessionService
  ) { }

  ngOnInit(): void {
    this.sessionService.onSignIn.subscribe(resp => {
      this.isSignIn = resp;
    });
  }

}
