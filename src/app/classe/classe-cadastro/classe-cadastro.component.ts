import { Component, OnInit, ErrorHandler } from '@angular/core';
import { ClasseService } from '../classe.service';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Classe } from '../../core/model';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-classe-cadastro',
  templateUrl: './classe-cadastro.component.html',
  styleUrls: ['./classe-cadastro.component.css']
})
export class ClasseCadastroComponent implements OnInit {
classe = new Classe();

  constructor(private classeService: ClasseService,
              private toasty: ToastyService,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idClasse = this.route.snapshot.params['id'];
    this.title.setTitle('Nova classe');

    if (idClasse) {
      this.carregarClasse(idClasse);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarClasse(form);
    } else {
      this.adicionarClasse(form);
    }
  }

  adicionarClasse(form: FormControl) {
    this.classeService.adicionar(this.classe)
      .then(classe => {
        this.toasty.success('Classe adicionada com sucesso!');
        this.router.navigate(['produtos/novo']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarClasse(form: FormControl) {
    this.classeService.atualizar(this.classe)
      .then(classe => {
        this.classe = classe;

        this.toasty.success('Classe alterada com sucesso!');
        this.atualizarTituloEdicao();
        this.router.navigate(['classes']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.classe.id);
  }

  carregarClasse(id: number) {
    this.classeService.buscarPorId(id)
      .then(classe => {
        this.classe = classe;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.classe = new Classe();
    }.bind(this), 1);
    this.router.navigate(['classes/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Classe: ${this.classe.nome}`);
  }

}
