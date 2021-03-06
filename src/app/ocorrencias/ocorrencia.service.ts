import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OcorrenciaService {

  ocorrenciasUrl: string;

  constructor(private http: AuthHttp) {
    this.ocorrenciasUrl = `${environment.apiUrl}/ocorrencias`;
   }

  listarTodas(): Promise<any> {

    return this.http.get(this.ocorrenciasUrl)
      .toPromise()
      .then(response => response.json());
  }

}
