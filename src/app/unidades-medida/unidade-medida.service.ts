import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import { environment } from '../../environments/environment';

@Injectable()
export class UnidadeMedidaService {

  unidadeUrl: string;

  constructor(private http: AuthHttp) {
    this.unidadeUrl = `${environment.apiUrl}/unidades`;
   }

  listarTodas(): Promise<any> {

    return this.http.get(this.unidadeUrl)
      .toPromise()
      .then(response => response.json());
  }

}
