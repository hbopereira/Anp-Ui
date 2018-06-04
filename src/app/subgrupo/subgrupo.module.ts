import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubgrupoCadastroComponent } from './subgrupo-cadastro/subgrupo-cadastro.component';
import { SubgrupoPesquisaComponent } from './subgrupo-pesquisa/subgrupo-pesquisa.component';
import { SubgrupoRoutingModule } from './subgrupo-routing.module';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    TableModule,
    TooltipModule,
    SelectButtonModule,
    FormsModule,
    InputMaskModule,
    SharedModule,
    SubgrupoRoutingModule
  ],
  declarations: [SubgrupoCadastroComponent, SubgrupoPesquisaComponent]
})
export class SubgrupoModule { }
