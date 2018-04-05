import { Component, OnInit } from '@angular/core';

@Component({
  template: `
    <div class="container" align="center">
      <h1 class="text-center">Desculpe você não possui autorização para acessar esta pagina !</h1>
    </div>
  `,
  styles: []
})
export class NaoAutorizadoComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
