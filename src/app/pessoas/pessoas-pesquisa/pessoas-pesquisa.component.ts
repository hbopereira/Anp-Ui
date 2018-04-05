import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { PessoaService, PessoaFiltro } from '../pessoa.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from '../../core/error-handler.service';

@Component({
  selector: 'app-pessoas-pesquisa',
  templateUrl: './pessoas-pesquisa.component.html',
  styleUrls: ['./pessoas-pesquisa.component.css']
})
export class PessoasPesquisaComponent implements OnInit {
  @ViewChild('tabela') tabela;
  pessoas = [];
  filtroPessoa = new PessoaFiltro();
  totalRegistros = 0;

  constructor(private pessoaService: PessoaService,
              private toasty: ToastyService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de pessoas');
  }

  pesquisar(pagina = 0) {
    this.filtroPessoa.pagina = pagina;

    this.pessoaService.pesquisar(this.filtroPessoa)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.pessoas = resultado.pessoas;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(pessoa: any) {
    this.confirmationService.confirm({
      message: 'tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(pessoa);
      }
    });
  }

  excluir(pessoa: any) {
    this.pessoaService.excluir(pessoa.id)
    .then(() => {
      if (this.tabela.first === 0) {
        this.pesquisar();
      } else {
        this.tabela.first = 0;
     }
       this.toasty.success('Pessoa excluida com sucesso');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  alternarStatus(pessoa: any): void {
    const novoStatus = !pessoa.ativo;

    this.pessoaService.mudarStatus(pessoa.id, novoStatus)
      .then(() => {
        const acao = novoStatus ? 'ativada' : 'desativada';

        pessoa.ativo = novoStatus;
        this.toasty.success(`Pessoa ${acao} com sucesso!`);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

}
