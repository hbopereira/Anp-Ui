import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GrupoService {

  gruposUrl: string;

  constructor(private http: AuthHttp) {
    this.gruposUrl = `${environment.apiUrl}/grupos`;
   }

  listarTodos(): Promise<any> {

    return this.http.get(this.gruposUrl)
      .toPromise()
      .then(response => response.json());
  }

}
