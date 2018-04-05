import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { JwtHelper } from 'angular2-jwt';
import { ToastyService } from 'ng2-toasty';


import { environment } from '../../environments/environment';

@Injectable()
export class AuthService {

  oauthTokenUrl: string;
  jwtPayload: any;

  constructor(
    private http: Http,
    private jtwHelper: JwtHelper,
    private toasty: ToastyService
  ) {
     this.carregarToken();
     this.oauthTokenUrl = `${environment.apiUrl}/oauth/token`;
    }

  login(usuario: string, senha: string): Promise<void> {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bGFy');

    const body = `username=${usuario}&password=${senha}&grant_type=password`;

    return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
    .toPromise()
    .then(response => {
      this.armazenarToken(response.json().access_token);
      this.toasty.success('Login sucesso !');
    })
    .catch(response => {
      if (response.status === 400) {
      const responseJson = response.json();

        if (responseJson.error === 'invalid_grant') {
           return Promise.reject('Usuário ou senha inválidos !');
        }
      }
      return Promise.reject(response);
    });
  }

  temPermissao(permissao: string) {
    return this.jwtPayload && this.jwtPayload.authorities.includes(permissao);
  }

  obterNovoAccessToken(): Promise<void> {
     const headers = new Headers();
     headers.append('Content-Type', 'application/x-www-form-urlencoded');
     headers.append('Authorization', 'Basic YW5ndWxhcjpAbmd1bGFy');

     const body = 'grant_type=refresh_token';
     return this.http.post(this.oauthTokenUrl, body, { headers, withCredentials: true })
     .toPromise()
     .then(response => {
       this.armazenarToken(response.json().access_token);
       console.log('access Token renovado !');
       return Promise.resolve(null);
     })
     .catch(response => {
       console.log('Erro ao renovar Token', response);
       return Promise.resolve(null);
     });

  }

  isAccessTokenInvalido() {
    const token = localStorage.getItem('token');

    return !token || this.jtwHelper.isTokenExpired(token);

  }

  limparAccessToken() {
    localStorage.removeItem('token');
    this.jwtPayload = null;
  }

  temQualquerPermissao(roles) {
    for (const role of roles) {
     if (this.temPermissao(role)) {
       return true;
     }
    }
    return false;
  }

  private armazenarToken(token: string) {
    this.jwtPayload = this.jtwHelper.decodeToken(token);
    localStorage.setItem('token', token);
  }

  private carregarToken() {
    const token = localStorage.getItem('token');

    if (token) {
      this.armazenarToken(token);
    }
  }

}
