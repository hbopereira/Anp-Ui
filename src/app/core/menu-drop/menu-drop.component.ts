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
      {
          label: 'Estoque',
          items: [
              [
                  {
                      label: 'Produto',
                      items: [{label: 'Novo Produto', icon: 'fa-plus', routerLink: 'produtos/novo'},
                      {label: 'Produtos', icon: 'fa-search', routerLink: '/produtos'}]
                  },
                 /* {
                      label: 'TV 2',
                      items: [{label: 'TV 2.1'},
                      {label: 'TV 2.2'}]
                  }
              ],
              [
                  {
                      label: 'TV 3',
                      items: [{label: 'TV 3.1'},
                      {label: 'TV 3.2'}]
                  },
                  {
                      label: 'TV 4',
                      items: [{label: 'TV 4.1'},
                      {label: 'TV 4.2'}]
                  },*/
              ]
          ]
      },
      {
          label: 'Financeiro',
          items: [
              [
                  {
                      label: 'Lançamento',
                      items: [{label: 'Novo Lançamento', icon: 'fa-plus', routerLink: 'lancamentos/novo'},
                      {label: 'Lançamentos', icon: 'fa-search', routerLink: '/lancamentos'}]
                  },
                  {
                    label: 'Dashboard Lançamentos',
                    items: [{label: 'Dashboard', routerLink: '/dashboard'}]
                  },
              ],
              [
                  /*{
                      label: 'Sports 4',
                      items: [{label: 'Sports 4.1'},
                      {label: 'Sports 4.2'}]
                  }*/
              ],
             /* [
                  {
                      label: 'Sports 5',
                      items: [{label: 'Sports 5.1'},
                      {label: 'Sports 5.2'}]
                  },
                  {
                      label: 'Sports 6',
                      items: [{label: 'Sports 6.1'},
                      {label: 'Sports 6.2'}]
                  }
              ] */
          ]
      },
      {
        label: 'Comercial',
        items: [
            [
                {
                    label: 'Venda',
                    items: [{label: 'Nova Venda', icon: 'fa-plus', routerLink: 'vendas/nova'},
                    {label: 'Vendas', icon: 'fa-search', routerLink: '/vendas'}]
                },
               /* {
                    label: 'TV 2',
                    items: [{label: 'TV 2.1'},
                    {label: 'TV 2.2'}]
                }
            ],
            [
                {
                    label: 'TV 3',
                    items: [{label: 'TV 3.1'},
                    {label: 'TV 3.2'}]
                },
                {
                    label: 'TV 4',
                    items: [{label: 'TV 4.1'},
                    {label: 'TV 4.2'}]
                },*/
            ]
        ]
    },
    {
      label: 'Administrativo',
      items: [
          [
            {
              label: 'Pessoa Fisica/Juridica',
              items: [{label: 'Nova Pessoa', icon: 'fa-plus', routerLink: 'pessoas/nova'},
              {label: 'Pessoas', icon: 'fa-search', routerLink: '/pessoas'}]
            },
             /* {
                  label: 'TV 2',
                  items: [{label: 'TV 2.1'},
                  {label: 'TV 2.2'}]
              }
          ],
          [
              {
                  label: 'TV 3',
                  items: [{label: 'TV 3.1'},
                  {label: 'TV 3.2'}]
              },
              {
                  label: 'TV 4',
                  items: [{label: 'TV 4.1'},
                  {label: 'TV 4.2'}]
              },*/
          ]
      ]
  },
    {
      label: 'Relatorios',
      items: [
          [
              {
                  label: 'Financeiro',
                  items: [{label: 'Lancamentos por tipo pessoa', icon: 'fa-search'}]
              },
             /* {
                  label: 'TV 2',
                  items: [{label: 'TV 2.1'},
                  {label: 'TV 2.2'}]
              }
          ],
          [
              {
                  label: 'TV 3',
                  items: [{label: 'TV 3.1'},
                  {label: 'TV 3.2'}]
              },
              {
                  label: 'TV 4',
                  items: [{label: 'TV 4.1'},
                  {label: 'TV 4.2'}]
              },*/
          ]
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
