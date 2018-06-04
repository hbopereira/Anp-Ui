import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { Classe } from '../core/model';

@Injectable()
export class ClasseService {

  classesUrl: string;

  constructor(private http: AuthHttp) {
    this.classesUrl = `${environment.apiUrl}/classes`;
   }

   adicionar(classe: Classe): Promise<Classe> {

    return this.http.post(this.classesUrl, JSON.stringify(classe))
      .toPromise()
      .then(response => response.json());
  }

  listarTodas(): Promise<any> {

    return this.http.get(this.classesUrl)
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.classesUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  atualizar(classe: Classe): Promise<Classe> {

    return this.http.put(`${this.classesUrl}/${classe.id}`,
        JSON.stringify(classe))
      .toPromise()
      .then(response => response.json() as Classe);
  }

  buscarPorId(id: number): Promise<Classe> {

    return this.http.get(`${this.classesUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Classe);
  }

}
