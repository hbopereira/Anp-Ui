import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { MarcaPesquisaComponent } from './marca-pesquisa/marca-pesquisa.component';
import { MarcaCadastroComponent } from './marca-cadastro/marca-cadastro.component';

const routes: Routes = [
  {
    path: 'marcas' , component: MarcaPesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'marcas/nova', component: MarcaCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MarcaRoutingModule { }
