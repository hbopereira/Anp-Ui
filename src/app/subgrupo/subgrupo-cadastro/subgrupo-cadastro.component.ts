import { Component, OnInit } from '@angular/core';
import { ToastyService } from 'ng2-toasty';
import { SubgrupoService } from '../subgrupo.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { SubGrupo } from '../../core/model';

@Component({
  selector: 'app-subgrupo-cadastro',
  templateUrl: './subgrupo-cadastro.component.html',
  styleUrls: ['./subgrupo-cadastro.component.css']
})
export class SubgrupoCadastroComponent implements OnInit {

  subgrupo = new SubGrupo();

  constructor(private subgrupoService: SubgrupoService,
              private toasty: ToastyService,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idGrupo = this.route.snapshot.params['id'];
    this.title.setTitle('Novo Subgrupo');

    if (idGrupo) {
      this.carregarSubgrupo(idGrupo);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarSubgrupo(form);
    } else {
      this.adicionarSubgrupo(form);
    }
  }

  adicionarSubgrupo(form: FormControl) {
    this.subgrupoService.adicionar(this.subgrupo)
      .then(classe => {
        this.toasty.success('Subgrupo adicionado com sucesso!');
        this.router.navigate(['produtos/novo']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarSubgrupo(form: FormControl) {
    this.subgrupoService.atualizar(this.subgrupo)
      .then(subgrupo => {
        this.subgrupo = subgrupo;

        this.toasty.success('Subgrupo alterado com sucesso!');
        this.atualizarTituloEdicao();
        this.router.navigate(['grupos']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.subgrupo.id);
  }

  carregarSubgrupo(id: number) {
    this.subgrupoService.buscarPorId(id)
      .then(subgrupo => {
        this.subgrupo = subgrupo;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.subgrupo = new SubGrupo();
    }.bind(this), 1);
    this.router.navigate(['subgrupos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Grupo: ${this.subgrupo.nome}`);
  }

}
