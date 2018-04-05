import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class OcorrenciaService {

  ocorrenciasUrl = 'http://localhost:8080/ocorrencias';

  constructor(private http: AuthHttp) { }

  listarTodas(): Promise<any> {

    return this.http.get(this.ocorrenciasUrl)
      .toPromise()
      .then(response => response.json());
  }

}
