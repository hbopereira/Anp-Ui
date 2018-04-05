import { Injectable } from '@angular/core';
import { AuthHttp } from 'angular2-jwt';
import { AuthService } from './auth.service';

import { environment } from '../../environments/environment';

@Injectable()
export class LogoutService {

  tokensRenokeUrl: string;

  constructor(private http: AuthHttp,
              private authService: AuthService) {
               this.tokensRenokeUrl = `${environment.apiUrl}/tokens/revoke`;
               }

  logout() {
    return this.http.delete(this.tokensRenokeUrl, { withCredentials: true })
    .toPromise()
    .then(() => {
      this.authService.limparAccessToken();
    });
  }

}
