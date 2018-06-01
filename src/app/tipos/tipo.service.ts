import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class TipoService {

  tiposUrl: string;

  constructor(private http: AuthHttp) {
    this.tiposUrl = `${environment.apiUrl}/tipos`;
   }

  listarTodas(): Promise<any> {

    return this.http.get(this.tiposUrl)
      .toPromise()
      .then(response => response.json());
  }

}
