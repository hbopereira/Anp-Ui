import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaCadastroComponent } from './marca-cadastro/marca-cadastro.component';
import { MarcaPesquisaComponent } from './marca-pesquisa/marca-pesquisa.component';
import { InputTextModule } from 'primeng/components/inputtext/inputtext';
import { ButtonModule } from 'primeng/components/button/button';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/components/tooltip/tooltip';
import { SelectButtonModule } from 'primeng/components/selectbutton/selectbutton';
import { FormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/components/inputmask/inputmask';
import { SharedModule } from '../shared/shared.module';
import { MarcaRoutingModule } from './marcas-routing.module';

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
    MarcaRoutingModule
  ],
  declarations: [MarcaCadastroComponent, MarcaPesquisaComponent]
})
export class MarcaModule { }
