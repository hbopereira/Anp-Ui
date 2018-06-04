import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { GrupoPesquisaComponent } from './grupo-pesquisa/grupo-pesquisa.component';
import { GrupoCadastroComponent } from './grupo-cadastro/grupo-cadastro.component';

const routes: Routes = [
  {
    path: 'grupos' , component: GrupoPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'grupos/novo', component: GrupoCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrupoRoutingModule { }
