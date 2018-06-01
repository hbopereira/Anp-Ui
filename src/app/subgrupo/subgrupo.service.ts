import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class SubgrupoService {

  subgruposUrl: string;

  constructor(private http: AuthHttp) {
    this.subgruposUrl = `${environment.apiUrl}/subgrupos`;
   }

  listarTodos(): Promise<any> {

    return this.http.get(this.subgruposUrl)
      .toPromise()
      .then(response => response.json());
  }

}
