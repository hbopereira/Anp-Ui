import { Component, OnInit, ErrorHandler } from '@angular/core';

import {MenubarModule} from 'primeng/menubar';
import {MenuItem} from 'primeng/api';
import { Router } from '@angular/router';
import { ErrorHandlerService } from '../error-handler.service';
import { LogoutService } from '../../seguranca/logout.service';
import { AuthService } from '../../seguranca/auth.service';

@Component({
  selector: 'app-menu-drop',
  templateUrl: './menu-drop.component.html',
  styleUrls: ['./menu-drop.component.css']
})
export class MenuDropComponent implements OnInit {

  items: MenuItem[];

  constructor(private router: Router,
              private errorHandler: ErrorHandler,
              private logoutService: LogoutService,
              public authService: AuthService) { }

  ngOnInit() {

    this.items = [
     /* {
          label: 'Arquivo',
          items: [{
                  label: 'Empresa',
                  items: [
                      {label: 'Logoff', icon: 'fa-search'},
                      {label: 'Troca Empresa', icon: 'fa-search'},
                      {label: 'Backup', icon: 'fa-search'},
                      {label: 'Empresa', icon: 'fa-search'},
                  ]
              },
          ]
      },*/
      {
        label: 'Administrativo',
        items: [{
                label: 'Pessoa F/J',
                items: [
                    {label: 'Nova Pessoa', icon: 'fa-plus', routerLink: 'pessoas/nova'},
                    {label: 'Pessoas', icon: 'fa-search', routerLink: 'pessoas'}
                ]
            },
            {
                label: 'Produto',
                items: [
                    {label: 'Novo Produto', icon: 'fa-plus', routerLink: 'produtos/novo'},
                    {label: 'Produtos', icon: 'fa-search', routerLink: 'produtos'},
                    {separator: true},
                    { label: 'Classes', icon: 'fa-search'},
                    {separator: true},
                    { label: 'Marcas', icon: 'fa-search'},
                    {separator: true},
                    { label: 'Grupos', icon: 'fa-search'},
                    {separator: true},
                    { label: 'Subgrupos', icon: 'fa-search'},
                ]
            },
        ]
      },
     /* {
        label: 'Operacional',
        items: [{
                label: 'Movimentação',
                items: [
                    {label: 'Vendas', icon: 'fa-search', routerLink: 'vendas'},
                    {label: 'Serviços', icon: 'fa-search'},
                    {label: 'Compras', icon: 'fa-search'}
                ]
            },
            {
                label: 'Estoque',
                items: [
                    {label: 'Movimentação Estoque', icon: 'fa-search'}
                ]
            },
        ]
      }, */
      {
        label: 'Financeiro',
        items: [{
                label: 'Lançamento',
                items: [
                    {label: 'Novo Lançamento', icon: 'fa-plus', routerLink: 'lancamentos/novo'},
                    {label: 'Lançamentos', icon: 'fa-search', routerLink: 'lancamentos'}
                ]
            },
            {
              label: 'Dashboard', routerLink: 'dashboard'
            }
        ]
      },
      {
        label: 'Relatórios',
        items: [{
                label: 'Financeiro',
                items: [
                    {label: 'Lançamentos por Pessoa F/J', icon: 'fa-search', routerLink: 'relatorio-por-pessoa'},
                    {label: 'Lançamentos por Categoria', icon: 'fa-search'}
                ]
            },
        ]
      },
  ];
  }

  logout() {
    this.logoutService.logout()
    .then(() => {
      this.router.navigate(['/login']);
    })
    .catch(erro => this.errorHandler.handleError(erro));
   }

}
