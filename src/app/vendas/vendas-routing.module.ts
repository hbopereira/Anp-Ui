import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { VendaCadastroComponent } from './venda-cadastro/venda-cadastro.component';
import { VendaPesquisaComponent } from './venda-pesquisa/venda-pesquisa.component';

const routes: Routes = [
  {
    path: 'vendas', component: VendaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'vendas/nova', component: VendaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendaRoutingModule { }
