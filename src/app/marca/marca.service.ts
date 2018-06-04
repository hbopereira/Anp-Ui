import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import { Marca } from '../core/model';

@Injectable()
export class MarcaService {

  marcasUrl: string;

  constructor(private http: AuthHttp) {
    this.marcasUrl = `${environment.apiUrl}/marcas`;
   }

   adicionar(marca: Marca): Promise<Marca> {

    return this.http.post(this.marcasUrl, JSON.stringify(marca))
      .toPromise()
      .then(response => response.json());
   }

  listarTodas(): Promise<any> {

    return this.http.get(this.marcasUrl)
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.marcasUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  atualizar(marca: Marca): Promise<Marca> {

    return this.http.put(`${this.marcasUrl}/${marca.id}`,
        JSON.stringify(marca))
      .toPromise()
      .then(response => response.json() as Marca);
  }

  buscarPorId(id: number): Promise<Marca> {

    return this.http.get(`${this.marcasUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Marca);
  }




}
