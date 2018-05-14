import { Component, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { ConfirmationService } from 'primeng/api';
import { LazyLoadEvent } from 'primeng/components/common/lazyloadevent';

import { ProdutoService, ProdutoFiltro } from '../produto.service';
import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from '../../core/error-handler.service';


@Component({
  selector: 'app-produto-pesquisa',
  templateUrl: './produto-pesquisa.component.html',
  styleUrls: ['./produto-pesquisa.component.css']
})
export class ProdutoPesquisaComponent implements OnInit {
  @ViewChild('tabela') tabela;
  produtos = [];
  filtroProduto = new ProdutoFiltro();
  totalRegistros = 0;

  constructor(private produtoService: ProdutoService,
              private toasty: ToastyService,
              private confirmationService: ConfirmationService,
              private errorHandler: ErrorHandlerService,
              private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de Produtos');
  }

  pesquisar(pagina = 0) {
    this.filtroProduto.pagina = pagina;

    this.produtoService.pesquisar(this.filtroProduto)
    .then(resultado => {
      this.totalRegistros = resultado.total;
      this.produtos = resultado.produtos;
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  aoMudarPagina(event: LazyLoadEvent) {
    const pagina = event.first / event.rows;
    this.pesquisar(pagina);
  }

  confirmarExclusao(produto: any) {
    this.confirmationService.confirm({
      message: 'tem certeza que deseja excluir ?',
      accept: () => {
        this.excluir(produto);
      }
    });
  }

  excluir(produto: any) {
    this.produtoService.excluir(produto.id)
    .then(() => {
      if (this.tabela.first === 0) {
        this.pesquisar();
      } else {
        this.tabela.first = 0;
     }
       this.toasty.success('Produto excluido com sucesso');
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

}
