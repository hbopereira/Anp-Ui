import { Component, OnInit } from '@angular/core';
import { MarcaService } from '../marca.service';
import { ToastyService } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { ErrorHandlerService } from '../../core/error-handler.service';
import { Title } from '@angular/platform-browser';
import { FormControl } from '@angular/forms';
import { Marca } from '../../core/model';

@Component({
  selector: 'app-marca-cadastro',
  templateUrl: './marca-cadastro.component.html',
  styleUrls: ['./marca-cadastro.component.css']
})
export class MarcaCadastroComponent implements OnInit {

  marca = new Marca();

  constructor(private marcaService: MarcaService,
              private toasty: ToastyService,
              private router: Router,
              private errorHandler: ErrorHandlerService,
              private title: Title,
              private route: ActivatedRoute) { }

  ngOnInit() {
    const idMarca = this.route.snapshot.params['id'];
    this.title.setTitle('Nova Marca');

    if (idMarca) {
      this.carregarClasse(idMarca);
    }
  }

  salvar(form: FormControl) {
    if (this.editando) {
      this.atualizarMarca(form);
    } else {
      this.adicionarMarca(form);
    }
  }

  adicionarMarca(form: FormControl) {
    this.marcaService.adicionar(this.marca)
      .then(classe => {
        this.toasty.success('Marca adicionada com sucesso!');
        this.router.navigate(['produtos/novo']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  atualizarMarca(form: FormControl) {
    this.marcaService.atualizar(this.marca)
      .then(marca => {
        this.marca = marca;

        this.toasty.success('Marca alterada com sucesso!');
        this.atualizarTituloEdicao();
        this.router.navigate(['Marcas']);
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  get editando() {
    return Boolean(this.marca.id);
  }

  carregarClasse(id: number) {
    this.marcaService.buscarPorId(id)
      .then(marca => {
        this.marca = marca;
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handle(erro));
  }

  nova(form: FormControl) {
    form.reset();
    setTimeout(function() {
      this.marca = new Marca();
    }.bind(this), 1);
    this.router.navigate(['marcas/nova']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Marca: ${this.marca.nome}`);
  }


}
