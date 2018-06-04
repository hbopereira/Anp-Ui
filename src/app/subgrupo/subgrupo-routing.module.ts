import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { SubgrupoPesquisaComponent } from './subgrupo-pesquisa/subgrupo-pesquisa.component';
import { SubgrupoCadastroComponent } from './subgrupo-cadastro/subgrupo-cadastro.component';

const routes: Routes = [
  {
    path: 'subgrupos' , component: SubgrupoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'subgrupos/novo', component: SubgrupoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubgrupoRoutingModule { }
