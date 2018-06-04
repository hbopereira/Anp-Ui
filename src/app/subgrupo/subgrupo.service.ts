import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { SubGrupo } from '../core/model';

@Injectable()
export class SubgrupoService {

  subgruposUrl: string;

  constructor(private http: AuthHttp) {
    this.subgruposUrl = `${environment.apiUrl}/subgrupos`;
   }

   adicionar(subgrupo: SubGrupo): Promise<SubGrupo> {

    return this.http.post(this.subgruposUrl, JSON.stringify(subgrupo))
      .toPromise()
      .then(response => response.json());
   }

  listarTodos(): Promise<any> {

    return this.http.get(this.subgruposUrl)
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.subgruposUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  atualizar(subgrupo: SubGrupo): Promise<SubGrupo> {

    return this.http.put(`${this.subgruposUrl}/${subgrupo.id}`,
        JSON.stringify(subgrupo))
      .toPromise()
      .then(response => response.json() as SubGrupo);
  }

  buscarPorId(id: number): Promise<SubGrupo> {

    return this.http.get(`${this.subgruposUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as SubGrupo);
  }

}
