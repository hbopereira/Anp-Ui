import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { LancamentoService, LancamentoFiltro } from '../lancamento.service';
import { AuthService } from '../../seguranca/auth.service';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';
import { ToastyService } from 'ng2-toasty';
import { ConfirmationService } from 'primeng/components/common/api';
import { ErrorHandlerService } from '../../core/error-handler.service';


@Component({
  selector: 'app-lancamentos-pesquisa',
  templateUrl: './lancamentos-pesquisa.component.html',
  styleUrls: ['./lancamentos-pesquisa.component.css']
})
export class LancamentosPesquisaComponent implements OnInit {
  @ViewChild('tabela') tabela;
  totalRegistros = 0;
  filtroLancamento = new LancamentoFiltro();
  lancamentos = [];

  constructor(private lancamentoService: LancamentoService,
              private auth: AuthService,
              private toasty: ToastyService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title) {}

  ngOnInit() {
    this.title.setTitle('Pesquisa de lançamentos');
  }

  pesquisar(pagina = 0) {
    this.filtroLancamento.pagina = pagina;

    this.lancamentoService.pesquisar(this.filtroLancamento)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.lancamentos = resultado.lancamentos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(lancamento: any) {
    this.confirmationService.confirm({
      message: 'tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(lancamento);
      }
    });
  }

  excluir (lancamento: any) {
     this.lancamentoService.excluir(lancamento.id)
     .then(() => {
       if (this.tabela.first === 0) {
         this.pesquisar();
       } else {
         this.tabela.first = 0;
      }
        this.toasty.success('Lançamento excluido com sucesso');
     })
     .catch(erro => this.errorHandler.handle(erro));
  }

}
