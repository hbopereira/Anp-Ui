import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../seguranca/auth.guard';
import { ClasseCadastroComponent } from './classe-cadastro/classe-cadastro.component';
import { ClassePesquisaComponent } from './classe-pesquisa/classe-pesquisa.component';

const routes: Routes = [
  {
    path: 'classes' , component: ClassePesquisaComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_PESQUISAR_LANCAMENTO'] }
  },
  {
    path: 'classes/nova', component: ClasseCadastroComponent,
    canActivate: [AuthGuard],
    data: { roles: ['ROLE_CADASTRAR_LANCAMENTO'] }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasseRoutingModule { }
