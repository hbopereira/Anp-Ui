import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { ConfirmationService } from 'primeng/api';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa, Contato } from './../../core/model';



@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();
  estados: any[];
  cidades: any[];
  estadoSelecionado: number;

  contato: Contato;
  contatoIndex: number;
  exibindoFormularioContato = false;

  tipos = [
    {label: 'Física', value: 'FISICA'},
    {label: 'Juridica', value: 'JURIDICA'}
];
  constructor( private pessoaService: PessoaService,
               private confirmationService: ConfirmationService,
               private toasty: ToastyService,
               private errorHandler: ErrorHandlerService,
               private title: Title,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    const idPessoa = this.route.snapshot.params['id'];
    this.title.setTitle('Nova pessoa');

    this.carregarEstados();

    if (idPessoa) {
      this.carregarPessoa(idPessoa);
    }
  }

  carregarEstados() {
    this.pessoaService.listarEstados().then(lista => {
      this.estados = lista.map(uf => ({ label: uf.nome, value: uf.id }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  carregarCidades() {
    this.pessoaService.pesquisarCidades(this.estadoSelecionado).then(lista => {
      this.cidades = lista.map(c => ({ label: c.nome, value: c.id }));
    })
    .catch(erro => this.errorHandler.handle(erro));
  }

  prepararNovoContato() {
    this.exibindoFormularioContato = true;
    this.contato = new Contato();
    this.contatoIndex = this.pessoa.contatos.length;
  }

  clonarContato(contato: Contato): Contato {
    return new Contato(contato.id,
                          contato.email,
                          contato.telefone);
  }

  prepararEdicaoContato(contato: Contato, index: number) {
    this.contato = this.clonarContato(contato);
    this.exibindoFormularioContato = true;
    this.contatoIndex = index;
  }

  confirmarContato(frm: FormControl) {
    this.pessoa.contatos[this.contatoIndex] = this.clonarContato(this.contato);

    this.exibindoFormularioContato = false;
    frm.reset();
  }

  confirmarExclusao(index: number) {
    this.confirmationService.confirm({
      message: 'tem certeza que deseja excluir ?',
      accept: () => {
        this.excluirContato(index);
      }
    });
  }

  excluirContato(index: number) {
    this.pessoa.contatos.splice(index, 1);
  }


  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarPessoa(form);
    } else {
      this.adicionarPessoa(form);
    }
  }

  adicionarPessoa(form: FormControl) {
    this.pessoaService.adicionar(this.pessoa)
      .then(pessoa => {
        this.toasty.success('Pessoa adicionada com sucesso!');
        this.router.navigate(['/pessoas', pessoa.id]);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarPessoa(form: FormControl) {
    this.pessoaService.atualizar(this.pessoa)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.toasty.success('Pessoa alterada com sucesso!');
        this.atualizarTituloEdicao();
        this.router.navigate(['pessoas']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.pessoa.id);
  }

  carregarPessoa(id: number) {
    this.pessoaService.buscarPorId(id)
      .then(pessoa => {
        this.pessoa = pessoa;

        this.estadoSelecionado = (this.pessoa.endereco.cidade) ?
        this.pessoa.endereco.cidade.estado.id : null;

        if (this.estadoSelecionado) {
          this.carregarCidades();
        }

        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.pessoa = new Pessoa();
    }.bind(this), 1);
    this.router.navigate(['pessoas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de pessoa: ${this.pessoa.nome}`);
  }


}


