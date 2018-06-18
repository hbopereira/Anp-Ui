import { Component, OnInit, ErrorHandler } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { ToastyService } from 'ng2-toasty';

import { ErrorHandlerService } from './../../core/error-handler.service';

import { ProdutoService } from './../produto.service';
import { Produto, Fornecedor, Classe, Marca, Grupo, SubGrupo } from './../../core/model';
import { ConfirmationService } from 'primeng/api';
import { TipoService } from '../../tipos/tipo.service';
import { UnidadeMedidaService } from '../../unidades-medida/unidade-medida.service';
import { GrupoService } from '../../grupo/grupo.service';
import { SubgrupoService } from '../../subgrupo/subgrupo.service';
import { ClasseService } from '../../classe/classe.service';
import { MarcaService } from '../../marca/marca.service';


@Component({
  selector: 'app-produto-cadastro',
  templateUrl: './produto-cadastro.component.html',
  styleUrls: ['./produto-cadastro.component.css']
})
export class ProdutoCadastroComponent implements OnInit {
  produto = new Produto();
  classe = new Classe();
  marca = new Marca();
  grupo = new Grupo();
  subGrupo = new SubGrupo();
  classes = [];
  marcas = [];
  tipos = [];
  unidadesMedida = [];
  grupos = [];
  subGrupos = [];
  formulario: FormGroup;

  exibindoFormularioFornecedor = false;
  exibindoFormularioClasse = false;
  exibindoFormularioMarca = false;
  exibindoFormularioGrupo = false;
  exibindoFormularioSubgrupo = false;

  fornecedor: Fornecedor;
  fornecedorIndex: number;

  constructor(private produtoService: ProdutoService,
              private tipoService: TipoService,
              private unidadeMedidaService: UnidadeMedidaService,
              private grupoService: GrupoService,
              private subgrupoService: SubgrupoService,
              private classeService: ClasseService,
              private marcaService: MarcaService,
              private toasty: ToastyService,
              private errorHandler: ErrorHandler,
              private errorHandlerService: ErrorHandlerService,
              private confirmationService: ConfirmationService,
              private title: Title,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.configurarFormulario();
    const idProduto = this.route.snapshot.params['id'];
    this.title.setTitle('Novo Produto');

    if (idProduto) {
       this.carregarProduto(idProduto);
    }

    this.carregarTipos();
    this.carregarUnidadesMedida();
    this.carregarClasses();
    this.carregarMarcas();
    this.carregarGrupos();
    this.carregarSubgrupos();
  }

  prepararNovaClasse() {
    this.exibindoFormularioClasse = true;
  }

  prepararNovaMarca() {
    this.exibindoFormularioMarca = true;
  }

  prepararNovoGrupo() {
    this.exibindoFormularioGrupo = true;
  }

  prepararNovoSubgrupo() {
    this.exibindoFormularioSubgrupo = true;
  }

  /*prepararNovoFornecedor() {
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
  } */

  configurarFormulario() {
    this.formulario = this.formBuilder.group({
      id: [],
      codigoBarras: [null, Validators.required],
      descricao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      aplicacao: [null, [this.validarObrigatoriedade, this.validarTamanhoMinimo(5)]],
      tipo: this.formBuilder.group({
        id: [null, Validators.required],
        descricao: []
      }),
      valorUnitario: [null, Validators.required],
      custoMedio: [null, Validators.required],
      ultimoCusto: [null, Validators.required],
      estoqueMinimo: [null, Validators.required],
      estoqueMaximo: [null, Validators.required],
      unidadeMedida: this.formBuilder.group({
        id: [null, Validators.required],
        descricao: []
      }),
      classe: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      marca: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      grupo: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
      subGrupo: this.formBuilder.group({
        id: [null, Validators.required],
        nome: []
      }),
     observacao: []
    });
   }

   desabilitarInputCustoMedio() {

   }

   validarObrigatoriedade(input: FormControl) {
     return (input.value ? null : { obrigatoriedade: true});
   }

   validarTamanhoMinimo(valor: number) {
     return (input: FormControl) => {
       return (!input.value || input.value.length >= valor) ? null : {tamanhoMinimo: {tamanho: valor}};
     };
   }

  salvar() {
    if (this.editando) {
      this.atualizarProduto();
    } else {
      this.adicionarProduto();
    }
  }

  adicionarProduto() {
    this.produtoService.adicionar(this.formulario.value)
      .then(produto => {
        this.toasty.success('Produto adicionado com sucesso!');
        this.router.navigate(['/produtos']);
      })
      .catch(erro => this.errorHandler.handleError(erro));
  }

  adicionarClasse(form: FormControl) {
    this.produtoService.adicionarClasse(this.classe)
      .then(classe => {
        this.exibindoFormularioClasse = false;
        form.reset();
        this.toasty.success('Classe adicionada com sucesso!');
      })
      .catch(erro => this.errorHandler.handleError(erro));
  }

  adicionarMarca(form: FormControl) {
    this.marcaService.adicionar(this.marca)
      .then(marca => {
        this.exibindoFormularioMarca = false;
        form.reset();
        this.toasty.success('Marca adicionada com sucesso!');
      })
      .catch(erro => this.errorHandler.handleError(erro));
  }

  adicionarGrupo(form: FormControl) {
    this.grupoService.adicionar(this.grupo)
      .then(grupo => {
        this.exibindoFormularioGrupo = false;
        form.reset();
        this.toasty.success('Grupo adicionado com sucesso!');
      })
      .catch(erro => this.errorHandler.handleError(erro));
  }

  adicionarSubgrupo(form: FormControl) {
    this.subgrupoService.adicionar(this.subGrupo)
      .then(subGrupo => {
        this.exibindoFormularioSubgrupo = false;
        form.reset();
        this.toasty.success('Subgrupo adicionado com sucesso!');
      })
      .catch(erro => this.errorHandler.handleError(erro));
  }

  atualizarProduto() {
    this.produtoService.atualizar(this.formulario.value)
      .then(produto => {

        this.formulario.patchValue(produto);
        this.toasty.success('Produto alterado com sucesso!');
        this.atualizarTituloEdicao();
        this.router.navigate(['produtos']);
      })
      .catch(erro => this.errorHandler.handleError(erro));
  }

  get editando() {
    return Boolean(this.formulario.get('id').value);
  }

  carregarProduto(id: number) {
    this.produtoService.buscarPorId(id)
      .then(produto => {
        this.formulario.patchValue(produto);
        this.atualizarTituloEdicao();
      })
      .catch(erro => this.errorHandler.handleError(erro));
  }

  carregarTipos() {
    return this.tipoService.listarTodas()
    .then(tipos => {
       this.tipos = tipos.map(t => {
         return { label: t.descricao , value: t.id };
       });
    })
    .catch(erro => this.errorHandler.handleError(erro));
 }


 carregarUnidadesMedida() {
  return this.unidadeMedidaService.listarTodas()
  .then(unidadesMedida => {
     this.unidadesMedida = unidadesMedida.map(u => {
       return { label: u.descricao , value: u.id };
     });
  })
  .catch(erro => this.errorHandler.handleError(erro));
}

carregarGrupos() {
  return this.grupoService.listarTodos()
  .then(grupos => {
     this.grupos = grupos.map(g => {
       return { label: g.nome , value: g.id };
     });
  })
  .catch(erro => this.errorHandler.handleError(erro));
}

carregarSubgrupos() {
  return this.subgrupoService.listarTodos()
  .then(subgrupos => {
     this.subGrupos = subgrupos.map(s => {
       return { label: s.nome , value: s.id };
     });
  })
  .catch(erro => this.errorHandler.handleError(erro));
}


carregarClasses() {
  return this.classeService.listarTodas()
  .then(classes => {
     this.classes = classes.map(s => {
       return { label: s.nome , value: s.id };
     });
  })
  .catch(erro => this.errorHandler.handleError(erro));
}

carregarMarcas() {
  return this.marcaService.listarTodas()
  .then(marcas => {
     this.marcas = marcas.map(s => {
       return { label: s.nome , value: s.id };
     });
  })
  .catch(erro => this.errorHandler.handleError(erro));
}

/*carregarGrupos() {
  this.produtoService.listarGrupos().then(lista => {
    this.grupos = lista.map(g => ({ label: g.nome, value: g.id }));
  })
  .catch(erro => this.errorHandlerService.handle(erro));
}

carregarSubgrupos() {
  this.produtoService.listarSubGrupos(this.grupoSelecionado).then(lista => {
    this.subGrupos = lista.map(s => ({ label: s.nome, value: s.id }));
  })
  .catch(erro => this.errorHandlerService.handle(erro));
}*/

  novo() {
    setTimeout(function() {
      this.produto = new Produto();
    }.bind(this), 1);
    this.router.navigate(['produtos/novo']);
  }

  atualizarTituloEdicao() {
    this.title.setTitle(`Edição de Produto: ${this.formulario.get('descricao').value}`);
  }
}
