import { Component, OnInit } from '@angular/core';
import { RelatoriosService } from '../relatorio.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-relatorio-lancamentos-pessoa',
  templateUrl: './relatorio-lancamentos-pessoa.component.html',
  styleUrls: ['./relatorio-lancamentos-pessoa.component.css']
})
export class RelatorioLancamentosPessoaComponent implements OnInit {

  periodoInicio: Date;
  periodoFim: Date;

  constructor(private relatoriosService: RelatoriosService, private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Relatório lancamentos por pessoa');
  }
  gerar() {
    this.relatoriosService.relatorioLancamentosPorPessoa(this.periodoInicio, this.periodoFim)
      .then(relatorio => {
        const url = window.URL.createObjectURL(relatorio);

        window.open(url);
      });
  }

}
