import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import { Produto, Classe, Marca, Grupo, SubGrupo } from './../core/model';

import { environment } from '../../environments/environment';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';

export class ProdutoFiltro {
   descricao: string;
   valorUnitario: number;
   pagina = 0;
   itensPorPagina = 1;
}

@Injectable()
export class ProdutoService {
  produtosUrl: string;
  classesUrl: string;
  marcasUrl: string;
  gruposUrl: string;
  subgruposUrl: string;

  constructor(private http: AuthHttp) {
    this.produtosUrl = `${environment.apiUrl}/produtos`;
    this.classesUrl = `${environment.apiUrl}/classes`;
    this.marcasUrl = `${environment.apiUrl}/marcas`;
    this.gruposUrl = `${environment.apiUrl}/grupos`;
    this.subgruposUrl = `${environment.apiUrl}/subgrupos`;
   }

  adicionar(produto: Produto): Promise<Produto> {

    return this.http.post(this.produtosUrl,
       JSON.stringify(produto))
      .toPromise()
      .then(response => response.json());
  }

  adicionarClasse(classe: Classe): Promise<Classe> {

    return this.http.post(this.classesUrl,
       JSON.stringify(classe))
      .toPromise()
      .then(response => response.json());
  }

  adicionarMarca(marca: Marca): Promise<Marca> {

    return this.http.post(this.marcasUrl,
       JSON.stringify(marca))
      .toPromise()
      .then(response => response.json());
  }

  adicionarGrupo(grupo: Grupo): Promise<Grupo> {

    return this.http.post(this.gruposUrl,
       JSON.stringify(grupo))
      .toPromise()
      .then(response => response.json());
  }

  adicionarSubgrupo(subgrupo: SubGrupo): Promise<SubGrupo> {

    return this.http.post(this.subgruposUrl,
       JSON.stringify(subgrupo))
      .toPromise()
      .then(response => response.json());
  }

  pesquisar(filtro: ProdutoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    return this.http.get(`${this.produtosUrl}`, { search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const produtos = responseJson.content;

      const resultado = {
        produtos: produtos,
        total: responseJson.totalElements
      };
      return resultado;
    });
  }


  listarTodas(): Promise<any> {

    return this.http.get(this.produtosUrl)
      .toPromise()
      .then(response => response.json().content);
  }

  excluir(id: number): Promise<void> {

    return this.http.delete(`${this.produtosUrl}/${id}`)
    .toPromise()
    .then(() => null);

  }

  atualizar(produto: Produto): Promise<Produto> {

    return this.http.put(`${this.produtosUrl}/${produto.id}`,
       JSON.stringify(produto))
      .toPromise()
      .then(response => response.json() as Produto);
  }

  buscarPorId(id: number): Promise<Produto> {

    return this.http.get(`${this.produtosUrl}/${id}`)
      .toPromise()
      .then(response => response.json() as Produto);
  }

  /*listarGrupos(): Promise<Grupo[]> {
    return this.http.get(this.gruposUrl)
     .toPromise()
     .then(response => response.json());
  }

  listarSubGrupos(grupo): Promise<Subgrupo[]> {
    const params = new URLSearchParams();
    params.set('grupo', grupo);

    return this.http.get(this.subGruposUrl, {
      search: params
    })
     .toPromise()
     .then(response => response.json());
  }*/

}

