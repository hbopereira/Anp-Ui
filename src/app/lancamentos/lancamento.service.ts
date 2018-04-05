import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';

import 'rxjs/add/operator/toPromise';
import * as moment from 'moment';
import { Lancamento } from '../core/model';

import { environment } from '../../environments/environment';

export class LancamentoFiltro {
   descricao: string;
   tipoOcorrencia: string;
   tipoLancamento: string;
   dataVencimentoDe: Date;
   dataVencimentoAte: Date;
   dataEmissao: Date;
   pagina = 0;
   itensPorPagina = 10;
}

@Injectable()
export class LancamentoService {
  lancamentosUrl: string;

  constructor(private http: AuthHttp) {
    this.lancamentosUrl = `${environment.apiUrl}/lancamentos`;
   }

  adicionar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.post(this.lancamentosUrl,
       JSON.stringify(lancamento))
      .toPromise()
      .then(response => response.json());
  }

  pesquisar(filtro: LancamentoFiltro): Promise<any> {
    const params = new URLSearchParams();

    params.set('page', filtro.pagina.toString());
    params.set('size', filtro.itensPorPagina.toString());

    if (filtro.descricao) {
      params.set('descricao', filtro.descricao);
    }

    if (filtro.tipoOcorrencia) {
      params.set('tipoOcorrencia', filtro.tipoOcorrencia);
    }

    if (filtro.dataVencimentoDe) {
      params.set('dataVencimentoDe', moment(filtro.dataVencimentoDe).format('YYYY-MM-DD'));
    }

    if (filtro.dataVencimentoAte) {
      params.set('dataVencimentoAte', moment(filtro.dataVencimentoAte).format('YYYY-MM-DD'));
    }

    if (filtro.dataEmissao) {
      params.set('dataEmissao', moment(filtro.dataEmissao).format('YYYY-MM-DD'));
    }


    return this.http.get(`${this.lancamentosUrl}?resumo`, { search: params })
    .toPromise()
    .then(response => {
      const responseJson = response.json();
      const lancamentos = responseJson.content;

      const resultado = {
        lancamentos: lancamentos,
        total: responseJson.totalElements
      };
      return resultado;
    });
  }

  excluir(id: number): Promise<void> {
    const headers = new Headers();
    headers.append('Authorization', 'Basic YWRtaW5AYWxnYW1vbmV5LmNvbTphZG1pbg==');

    return this.http.delete(`${this.lancamentosUrl}/${id}`, { headers })
    .toPromise()
    .then(() => null);

  }

  atualizar(lancamento: Lancamento): Promise<Lancamento> {

    return this.http.put(`${this.lancamentosUrl}/${lancamento.id}`,
        JSON.stringify(lancamento))
      .toPromise()
      .then(response => {
        const lancamentoAlterado = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamentoAlterado]);

        return lancamentoAlterado;
      });
  }

  buscarPorId(id: number): Promise<Lancamento> {

    return this.http.get(`${this.lancamentosUrl}/${id}`)
      .toPromise()
      .then(response => {
        const lancamento = response.json() as Lancamento;

        this.converterStringsParaDatas([lancamento]);

        return lancamento;
      });
  }

  private converterStringsParaDatas(lancamentos: Lancamento[]) {
    for (const lancamento of lancamentos) {
      lancamento.dataVencimento = moment(lancamento.dataVencimento,
        'YYYY-MM-DD').toDate();

      if (lancamento.dataPagamento) {
        lancamento.dataPagamento = moment(lancamento.dataPagamento,
          'YYYY-MM-DD').toDate();
      }

      if (lancamento.dataEmissao) {
        lancamento.dataEmissao = moment(lancamento.dataEmissao,
          'YYYY-MM-DD').toDate();
      }
    }
  }

}
