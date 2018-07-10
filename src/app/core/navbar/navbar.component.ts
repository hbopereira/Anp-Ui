import { Component, OnInit, ErrorHandler } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../seguranca/auth.service';
import { LogoutService } from '../../seguranca/logout.service';
import { ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  exibindoMenu = false;

  exibindoFormularioCadastroUsuario = false;

  constructor(private router: Router,
              public authService: AuthService,
              private logoutService: LogoutService,
              private errorHandler: ErrorHandler,
              private toasty: ToastyService) { }

  ngOnInit() {
  }

  prepararNovoUsuario() {
    this.exibindoFormularioCadastroUsuario = true;
  }

  enviarSolicitacao () {
      this.toasty.success('Cadastro realizado com sucesso !');
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
