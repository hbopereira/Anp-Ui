import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';


import { NavbarComponent } from './navbar/navbar.component';
import { providers } from 'ng2-toasty';
import { ErrorHandlerService } from './error-handler.service';
import { JwtHelper } from 'angular2-jwt';

import { ToastyModule } from 'ng2-toasty';
import { ConfirmDialogModule } from 'primeng/components/confirmdialog/confirmdialog';
import { ConfirmationService } from 'primeng/components/common/api';


import { PessoaService } from './../pessoas/pessoa.service';
import { LancamentoService } from './../lancamentos/lancamento.service';
import { DashboardService } from './../dashboard/dashboard.service';
import { AuthService } from '../seguranca/auth.service';
import { PaginaNaoEncontradaComponent } from './pagina-nao-encontrada.component';
import { NaoAutorizadoComponent } from './nao-autorizado.component';
import { MenuDropComponent } from './menu-drop/menu-drop.component';
import { ProdutoService } from './../produtos/produto.service';
import { Menubar, MenubarModule } from 'primeng/menubar';
import {MegaMenuModule} from 'primeng/megamenu';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ToastyModule.forRoot(),
    ConfirmDialogModule,
    MenubarModule,
    MegaMenuModule
  ],
  declarations: [
    NavbarComponent,
    PaginaNaoEncontradaComponent,
    NaoAutorizadoComponent,
    MenuDropComponent
  ],
  exports: [
    NavbarComponent,
    MenuDropComponent,
    ToastyModule,
    ConfirmDialogModule,
    MenubarModule,
    MegaMenuModule
  ],
  providers : [
      ErrorHandlerService,
      LancamentoService,
      PessoaService,
      DashboardService,
      ProdutoService,
      ConfirmationService,
      AuthService,
      JwtHelper,
      Title,
     { provide: LOCALE_ID, useValue: 'pt-BR' }
  ]
})
export class CoreModule { }
