import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';
import { ErrorHandlerService } from '../../core/error-handler.service';

import { ProdutoService } from './../produto.service';
import { Produto, Fornecedor } from './../../core/model';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {
  produto = new Produto();
  exibindoFormularioFornecedor = false;
  fornecedor: Fornecedor;
  fornecedorIndex: number;

  constructor(private produtoService: ProdutoService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandlerService,
              private confirmationService: ConfirmationService,
              private title: Title,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idProduto = this.route.snapshot.params['id'];
    this.title.setTitle('Novo Produto');

    if (idProduto) {
       this.carregarProduto(idProduto);
    }
  }

  prepararNovoFornecedor() {
    this.exibindoFormularioFornecedor = true;
    this.fornecedor = new Fornecedor();
    this.fornecedorIndex = this.produto.fornecedores.length;
  }

  clonarFornecedor(fornecedor: Fornecedor) {
    return new Fornecedor(fornecedor.id,
                          fornecedor.nome,
                          fornecedor.cnpj,
                          fornecedor.email,
                          fornecedor.telefone);
  }

  prepararEdicaoFornecedor(fornecedor: Fornecedor, index: number) {
    this.fornecedor = this.clonarFornecedor(fornecedor);
    this.exibindoFormularioFornecedor = true;
    this.fornecedorIndex = index;
  }

  confirmarFornecedor(frm: FormControl) {
    this.produto.fornecedores[this.fornecedorIndex] = this.clonarFornecedor(this.fornecedor);

    this.exibindoFormularioFornecedor = false;
    frm.reset();
  }

  confirmarExclusao(index: number) {
    this.confirmationService.confirm({
      message: 'tem certeza que deseja excluir ?',
      accept: () => {
        this.excluirFornecedor(index);
      }
    });
  }

  excluirFornecedor(index: number) {
    this.produto.fornecedores.splice(index, 1);
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarProduto(form);
    } else {
      this.adicionarProduto(form);
    }
  }

  adicionarProduto(form: FormControl) {
    this.produtoService.adicionar(this.produto)
      .then(produto => {
        this.toasty.success('Produto adicionado com sucesso!');
        this.router.navigate(['/produtos', produto.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarProduto(form: FormControl) {
    this.produtoService.atualizar(this.produto)
      .then(produto => {
        this.produto = produto;

        this.toasty.success('Produto alterado com sucesso!');
        this.atualizarTituloEdicao();
        this.router.navigate(['produtos']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.produto.id);
  }

  carregarProduto(id: number) {
    this.produtoService.buscarPorId(id)
      .then(produto => {
        this.produto = produto;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  novo(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.produto = new Produto();
    }.bind(this), 1);
    this.router.navigate(['produtos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de produto: ${this.produto.descricao}`);
  }

}
