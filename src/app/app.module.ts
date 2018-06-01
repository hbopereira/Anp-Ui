import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// Adicione o registerLocaleData e o localePt
import localePt from '@angular/common/locales/pt';
import { registerLocaleData, CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { Route } from '@angular/compiler/src/core';

import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { AppRoutingModule } from './app-routing.module';
import { SegurancaModule } from './seguranca/seguranca.module';
import { PessoasModule } from './pessoas/pessoas.module';
import { LancamentosModule } from './lancamentos/lancamentos.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { VendasModule } from './vendas/vendas.module';
import { ProdutosModule } from './produtos/produtos.module';
import { ProdutoService } from './produtos/produto.service';
import { RelatoriosModule } from './relatorios/relatorios.module';




// E por fim, registre o localePt como 'pt-BR'
registerLocaleData(localePt, 'pt-BR');


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    CommonModule,
    PessoasModule,
    LancamentosModule,
    DashboardModule,
    CoreModule,
    SegurancaModule,
    VendasModule,
    ProdutosModule,
    RelatoriosModule,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
