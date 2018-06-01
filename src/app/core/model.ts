export class Endereco {
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cep: string;
  cidade: string;
  estado: string;
}

export class Pessoa {
id: number;
tipo: 'FISICA';
nome: string;
cnpj: string;
email: string;
ativo = true;
endereco = new Endereco();
}

export class Categoria {
id: number;
}

export class Ocorrencia {
id: number;
}

export class Tipo {
id: number;
}

export class UnidadeMedida {
  id: number;
}

export class Grupo {
  id: number;
}

export class SubGrupo {
  id: number;
}

export class Classe {
  id: number;
}

export class Marca {
  id: number;
}

export class Fornecedor {
  id: number;
  nome: string;
  cnpj: string;
  email: string;
  telefone: string;

  constructor(id?: number,
              nome?: string,
              cnpj?: string,
              email?: string,
              telefone?: string
            ) {
              this.id = id;
              this.nome = nome;
              this.cnpj = cnpj;
              this.email = email;
              this.telefone = telefone;
            }
}

export class Produto {
  id: number;
  codigoBarras: string;
  controlaEstoque = true;
  estoqueMinimo: number;
  estoqueMaximo: number;
  ultimoCusto: number;
  custoMedio: number;
  descricao: string;
  aplicacao: string;
  valorUnitario: number;
  dataCadastro: string;
  dataModificacao: string;
  ativo = true;
  observacao: String;
  tipo = new Tipo();
  unidadeMedida = new UnidadeMedida();
  classe = new Classe();
  marca = new Marca();
  grupo = new Grupo();
  subGrupo = new SubGrupo();
  fornecedores = new Array<Fornecedor>();

}

export class Venda {
  produto = new Array<Produto>();
}

export class Lancamento {
  id: number;
  tipo = 'RECEITA';
  descricao: string;
  dataEmissao: Date;
  dataVencimento: Date;
  dataPagamento: Date;
  valor: number;
  observacao: string;
  pessoa = new Pessoa();
  categoria = new Categoria();
  ocorrencia = new Ocorrencia();

}
