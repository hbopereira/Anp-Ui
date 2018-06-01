import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class MarcaService {

  marcasUrl: string;

  constructor(private http: AuthHttp) {
    this.marcasUrl = `${environment.apiUrl}/marcas`;
   }

  listarTodas(): Promise<any> {

    return this.http.get(this.marcasUrl)
      .toPromise()
      .then(response => response.json());
  }

}
