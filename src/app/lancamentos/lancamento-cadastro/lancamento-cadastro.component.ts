import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
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
  formulario: FormGroup;

  constructor(
    private categoriaService: CategoriaService,
    private ocorrenciaService: OcorrenciaService,
    private pessoaService: PessoaService,
    private lancamentoService: LancamentoService,
    private toasty: ToastyService,
    private errorHandler: ErrorHandler,
    private route: ActivatedRoute,
    private router: Router,
    private title: Title,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.configurarFormulario();
    const idLancamento = this.route.snapshot.params['id'];

    if (idLancamento) {
      this.carregarLancamento(idLancamento);
    }

    this.carregarCategorias();
    this.carregarOcorrencias();
    this.carregarPessoasFisicasJuridicas();
    this.title.setTitle('Novo lançamento');
  }

  configurarFormulario() {
   this.formulario = this.formBuilder.group({
     id: [],
     tipo: ['RECEITA', Validators.required],
     dataVencimento: [null, Validators.required],
     dataPagamento: [],
     dataEmissao: [null, Validators.required],
     descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
     ocorrencia: this.formBuilder.group({
       id: [null, Validators.required],
       descricao: []
     }),
     valor: [null, Validators.required],
     categoria: this.formBuilder.group({
       id: [ null, Validators.required],
       descricao: []
     }),
     pessoa: this.formBuilder.group({
      id: [ null, Validators.required],
      nome: []
    }),
    observacao: []
   });
  }

  validarObrigatoriedade(input: FormControl) {
    return (input.value ? null : { obrigatoriedade: true});
  }

  validarTamanhoMinimo(valor: number) {
    return (input: FormControl) => {
      return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho: valor}};
    };
  }
  salvar () {
    if (this.editando) {
       this.atualizarLancamento();
    } else {
      this.salvarLancamento();
    }
  }

  salvarLancamento() {
    this.lancamentoService.adicionar(this.formulario.value)
    .then(lancamento => {
       this.toasty.success('Lançamento adicionado com sucesso !');
       this.router.navigate(['/lancamentos', lancamento.id]);
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }

  atualizarLancamento() {
    this.lancamentoService.atualizar(this.formulario.value)
    .then(lancamento => {

      this.formulario.patchValue(lancamento);
      this.toasty.success('Lançamento editado com sucesso !');
      this.atualizarTituloEdicao();
      this.router.navigate(['lancamentos']);
    })
    .catch(erro => this.errorHandler.handleError(erro));
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  carregarLancamento(id: number) {
    this.lancamentoService.buscarPorId(id)
    .then(lancamento => {

      this.formulario.patchValue(lancamento);
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

 novo() {
  this.formulario.reset();
  setTimeout(function() {
    this.lancamento = new Lancamento();
  }.bind(this), 1);
  this.router.navigate(['lancamentos/novo']);
 }

 atualizarTituloEdicao() {
   this.title.setTitle(`Edição de lancamento: ${this.formulario.get('descricao').value}`);
 }

}
