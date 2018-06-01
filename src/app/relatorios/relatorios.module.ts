import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CalendarModule } from 'primeng/calendar';

import { RelatoriosRoutingModule } from './relatorios-routing.module';
import { RelatorioLancamentosPessoaComponent } from './relatorio-lancamentos-pessoa/relatorio-lancamentos-pessoa.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,

    CalendarModule,
    SharedModule,
    RelatoriosRoutingModule
  ],
  declarations: [RelatorioLancamentosPessoaComponent]
})
export class RelatoriosModule { }
