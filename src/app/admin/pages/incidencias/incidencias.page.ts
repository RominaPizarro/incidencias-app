import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incidencias',
  templateUrl: './incidencias.page.html',
  styleUrls: ['./incidencias.page.scss'],
})
export class IncidenciasPage implements OnInit {

  componente: any = {selected: 'list-incidencia'};

  constructor() { }

  ngOnInit() {
  }

  changeComponent(componente: string): void{
    this.componente.selected = componente;
  }
}
