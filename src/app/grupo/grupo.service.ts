import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { Grupo } from '../core/model';

@Injectable()
export class GrupoService {

  gruposUrl: string;

  constructor(private http: AuthHttp) {
    this.gruposUrl = `${environment.apiUrl}/grupos`;
   }

   adicionar(grupo: Grupo): Promise<Grupo> {

    return this.http.post(this.gruposUrl, JSON.stringify(grupo))
      .toPromise()
      .then(response => response.json());
   }

  listarTodos(): Promise<any> {

    return this.http.get(this.gruposUrl)
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.gruposUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  atualizar(grupo: Grupo): Promise<Grupo> {

    return this.http.put(`${this.gruposUrl}/${grupo.id}`,
        JSON.stringify(grupo))
      .toPromise()
      .then(response => response.json() as Grupo);
  }

  buscarPorId(id: number): Promise<Grupo> {

    return this.http.get(`${this.gruposUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Grupo);
  }

}
