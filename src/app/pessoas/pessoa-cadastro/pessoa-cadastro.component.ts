import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';
import { PessoaService } from './../pessoa.service';
import { Pessoa } from './../../core/model';



@Component({
  selector: 'app-pessoa-cadastro',
  templateUrl: './pessoa-cadastro.component.html',
  styleUrls: ['./pessoa-cadastro.component.css']
})
export class PessoaCadastroComponent implements OnInit {
  pessoa = new Pessoa();

  tipos = [
    {label: 'Física', value: 'FISICA'},
    {label: 'Juridica', value: 'JURIDICA'}
];
  constructor( private pessoaService: PessoaService,
               private toasty: ToastyService,
               private errorHandler: ErrorHandlerService,
               private title: Title,
               private router: Router,
               private route: ActivatedRoute) { }

  ngOnInit() {
    const idPessoa = this.route.snapshot.params['id'];
    this.title.setTitle('Nova pessoa');

    if (idPessoa) {
      this.carregarPessoa(idPessoa);
    }
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


