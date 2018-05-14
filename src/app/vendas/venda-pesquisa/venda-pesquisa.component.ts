import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-venda-pesquisa',
  templateUrl: './venda-pesquisa.component.html',
  styleUrls: ['./venda-pesquisa.component.css']
})
export class VendaPesquisaComponent implements OnInit {

  constructor(private title: Title) { }

  ngOnInit() {
    this.title.setTitle('Pesquisa de vendas');
  }

}
