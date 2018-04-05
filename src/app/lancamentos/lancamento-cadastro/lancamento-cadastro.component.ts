import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

import { ToastyService } from 'ng2-toasty';

import { CategoriaService } from '../../categorias/categoria.service';
import { OcorrenciaService } from '../../ocorrencias/ocorrencia.service';
import { PessoaService } from '../../pessoas/pessoa.service';
import { Lancamento } from './../../core/model';
import { LancamentoService } from '../lancamento.service';





@Component({
  selector: 'app-lancamento-cadastro',
  templateUrl: './lancamento-cadastro.component.html',
  styleUrls: ['./lancamento-cadastro.component.css']
})
export class LancamentoCadastroComponent implements OnInit {
  tipos = [
      {label: 'Receita', value: 'RECEITA'},
      {label: 'Despesa', value: 'DESPESA'}
  ];

  categorias = [];
  ocorrencias = [];
  pessoas = [];
  lancamento = new Lancamento();

  constructor(
    private categoriaService: CategoriaService,
    private ocorrenciaService: OcorrenciaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title
  ) { }

  ngOnInit() {
    const idLancamento = this.route.snapshot.params['id'];

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
    }

    this.carregarCategorias();
    this.carregarOcorrencias();
    this.carregarPessoasFisicasJuridicas();
    this.title.setTitle('Novo lançamento');
  }

  salvar (form: FormControl) {
    if (this.editando) {
       this.atualizarLancamento(form);
    } else {
      this.salvarLancamento(form);
    }
  }

  salvarLancamento(form: FormControl) {
    this.lancamentoService.adicionar(this.lancamento)
    .then(lancamento => {
       this.toasty.success('Lançamento adicionado com sucesso !');
       this.router.navigate(['/lancamentos', lancamento.id]);
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }

  atualizarLancamento(form: FormControl) {
    this.lancamentoService.atualizar(this.lancamento)
    .then(lancamento => {
      this.lancamento = lancamento;

      this.toasty.success('Lançamento editado com sucesso !');
      this.atualizarTituloEdicao();
      this.router.navigate(['lancamentos']);
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }

  get editando() {
    return Boolean(this.lancamento.id);
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
    .then(lancamento => {
      this.lancamento = lancamento;
      this.atualizarTituloEdicao();
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }

  carregarCategorias() {
     return this.categoriaService.listarTodas()
     .then(categorias => {
        this.categorias = categorias.map(c => {
          return { label: c.descricao , value: c.id };
        });
     })
     .catch(erro => this.errorHandler.handleError(erro));
  }

  carregarOcorrencias() {
     return this.ocorrenciaService.listarTodas()
     .then(ocorrencias => {
        this.ocorrencias = ocorrencias.map(o => {
          return { label: o.descricao , value: o.id };
        });
     })
     .catch(erro => this.errorHandler.handleError(erro));
  }

  carregarPessoasFisicasJuridicas() {
    return this.pessoaService.listarTodas()
    .then(pessoas => {
       this.pessoas = pessoas.map(p => {
         return { label: p.nome , value: p.id };
       });
    })
    .catch(erro => this.errorHandler.handleError(erro));
 }

 novo(form: FormControl) {
   this.router.navigate(['/lancamentos/novo']);
 }

 atualizarTituloEdicao() {
   this.title.setTitle(`Edição de lancamento: ${this.lancamento.descricao}`);
 }

}
