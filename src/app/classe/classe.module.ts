import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClasseCadastroComponent } from './classe-cadastro/classe-cadastro.component';
import { ClassePesquisaComponent } from './classe-pesquisa/classe-pesquisa.component';

import { ClasseRoutingModule } from './classe-routing.module';

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
    ClasseRoutingModule
  ],
  declarations: [ClasseCadastroComponent, ClassePesquisaComponent]
})
export class ClasseModule { }
