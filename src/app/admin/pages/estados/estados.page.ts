import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estados',
  templateUrl: './estados.page.html',
  styleUrls: ['./estados.page.scss'],
})
export class EstadosPage implements OnInit {

  componente: any = {selected: 'list-estado'};

  constructor() { }

  ngOnInit() {
  }

  changeComponent(componente: string): void{
    this.componente.selected = componente;
  }

}
