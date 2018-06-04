import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GrupoService } from '../grupo.service';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { Grupo } from '../../core/model';

@Component({
  selector: 'app-grupo-cadastro',
  templateUrl: './grupo-cadastro.component.html',
  styleUrls: ['./grupo-cadastro.component.css']
})
export class GrupoCadastroComponent implements OnInit {

  grupo = new Grupo();

  constructor(private grupoService: GrupoService,
              private toasty: ToastyService,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idClasse = this.route.snapshot.params['id'];
    this.title.setTitle('Novo Grupo');

    if (idClasse) {
      this.carregarGrupo(idClasse);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarGrupo(form);
    } else {
      this.adicionarGrupo(form);
    }
  }

  adicionarGrupo(form: FormControl) {
    this.grupoService.adicionar(this.grupo)
      .then(classe => {
        this.toasty.success('Grupo adicionado com sucesso!');
        this.router.navigate(['produtos/novo']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarGrupo(form: FormControl) {
    this.grupoService.atualizar(this.grupo)
      .then(grupo => {
        this.grupo = grupo;

        this.toasty.success('Grupo alterado com sucesso!');
        this.atualizarTituloEdicao();
        this.router.navigate(['grupos']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.grupo.id);
  }

  carregarGrupo(id: number) {
    this.grupoService.buscarPorId(id)
      .then(grupo => {
        this.grupo = grupo;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.grupo = new Grupo();
    }.bind(this), 1);
    this.router.navigate(['grupos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Grupo: ${this.grupo.nome}`);
  }
}
