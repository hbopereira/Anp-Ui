import { Injectable } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Pessoa, Estado, Cidade } from './../core/model';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class PessoaFiltro {
  nome: string;
  ativo: string;
  tipo: string;
  pagina = 0;
  itensPorPagina = 10;
}

@Injectable()
export class PessoaService {

  pessoasUrl: string;
  estadosUrl: string;
  cidadesUrl: string;

  constructor(private http: AuthHttp) {

    this.pessoasUrl = `${environment.apiUrl}/pessoas`;
    this.estadosUrl = `${environment.apiUrl}/estados`;
    this.cidadesUrl = `${environment.apiUrl}/cidades`;
  }

  adicionar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.post(this.pessoasUrl, JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json());
  }

  pesquisar(filtro: PessoaFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.nome) {
      params.set('nome', filtro.nome);
    }

    if (filtro.ativo) {
      params.set('ativo', filtro.ativo);
    }

    if (filtro.tipo) {
      params.set('tipo', filtro.tipo);
    }

    return this.http.get(`${this.pessoasUrl}`, { search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const pessoas = responseJson.content;

      const resultado = {
        pessoas: pessoas,
        total: responseJson.totalElements
      };
      return resultado;
    });
  }

  listarTodas(): Promise<any> {

    return this.http.get(this.pessoasUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  listarEstados(): Promise<Estado[]> {

    return this.http.get(this.estadosUrl)
      .toPromise()
      .then(response => response.json());
  }


  pesquisarCidades(estado): Promise<Cidade[]> {

    const params = new URLSearchParams();
    params.set('estado', estado);

    return this.http.get(this.cidadesUrl, {search: params})
      .toPromise()
      .then(response => response.json());
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.pessoasUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  mudarStatus(id: number, ativo: boolean): Promise<void> {

    return this.http.put(`${this.pessoasUrl}/${id}/ativo`, ativo)
      .toPromise()
      .then(() => null);
  }

  atualizar(pessoa: Pessoa): Promise<Pessoa> {

    return this.http.put(`${this.pessoasUrl}/${pessoa.id}`,
        JSON.stringify(pessoa))
      .toPromise()
      .then(response => response.json() as Pessoa);
  }

  buscarPorId(id: number): Promise<Pessoa> {

    return this.http.get(`${this.pessoasUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Pessoa);
  }
}
