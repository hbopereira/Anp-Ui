import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../seguranca/auth.service';
import { LogoutService } from '../../seguranca/logout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  constructor(private router: Router,
              public authService: AuthService,
              private logoutService: LogoutService,
              private errorHandler: ErrorHandler) { }

  ngOnInit() {
  }


  novoAccessToken() {
    this.authService.obterNovoAccessToken();
  }

  logout() {
   this.logoutService.logout()
   .then(() => {
     this.router.navigate(['/login']);
   })
   .catch(erro => this.errorHandler.handleError(erro));
  }

}
