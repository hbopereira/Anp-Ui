import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/table';
import { InputTextareaModule } from 'primeng/components/inputtextarea/inputtextarea';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { DropdownModule } from 'primeng/components/dropdown/dropdown';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { PanelModule } from 'primeng/panel';
import { DialogModule } from 'primeng/dialog';

import { ProdutoCadastroComponent } from './produto-cadastro/produto-cadastro.component';
import { ProdutoPesquisaComponent } from './produto-pesquisa/produto-pesquisa.component';
import { ProdutoRoutingModule } from './produtos-routing.module';

import { SharedModule } from '../shared/shared.module';
import { CurrencyMaskModule } from 'ng2-currency-mask';





@NgModule({
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    CommonModule,
    TooltipModule,
    ButtonModule,
    InputTextareaModule,
    TableModule,
    InputTextModule,
    SharedModule,
    InputMaskModule,
    FormsModule,
    SelectButtonModule,
    DropdownModule,
    BrowserModule,
    BrowserAnimationsModule,
    CurrencyMaskModule,
    PanelModule,
    DialogModule,
    InputMaskModule
  ],
  declarations: [
    ProdutoCadastroComponent,
    ProdutoPesquisaComponent
  ],
  exports: []
})
export class ProdutosModule { }
