import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClasseService {

  classesUrl: string;

  constructor(private http: AuthHttp) {
    this.classesUrl = `${environment.apiUrl}/classes`;
   }

  listarTodas(): Promise<any> {

    return this.http.get(this.classesUrl)
      .toPromise()
      .then(response => response.json());
  }

}
