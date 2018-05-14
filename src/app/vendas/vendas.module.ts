import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';

import { VendaRoutingModule } from './vendas-routing.module';

import { VendaCadastroComponent } from './venda-cadastro/venda-cadastro.component';
import { VendaPesquisaComponent } from './venda-pesquisa/venda-pesquisa.component';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { CalendarModule } from 'primeng/components/calendar/calendar';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  imports: [
    CommonModule,
    TooltipModule,
    ButtonModule,
    InputTextareaModule,
    VendaRoutingModule,
    TableModule,
    InputTextModule,
    DropdownModule,
    CalendarModule,
    FormsModule,
    PanelModule,
    DialogModule
  ],
  declarations: [VendaCadastroComponent, VendaPesquisaComponent]
})
export class VendasModule { }
