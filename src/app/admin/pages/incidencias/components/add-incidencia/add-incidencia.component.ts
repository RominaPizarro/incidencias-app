import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-incidencia',
  templateUrl: './add-incidencia.component.html',
  styleUrls: ['./add-incidencia.component.scss'],
})
export class AddIncidenciaComponent  implements OnInit {

  @Input() componenteSelected: any = {};

  codigo: string = '';
  nombre: string = '';
  area: string = '';
  descripcion: string = '';
  usuarioReporta: any = { nombre: 'ROMINA LORETO PIZARRO CABANAS' };

  areas = ['Recursos Humanos', 'Oficina de Técnologías de Información', 'Atención al Cliente'];

  constructor() {}

  ngOnInit() {
  }

  guardar() {}

  cancelar() {
    this.componenteSelected.selected = 'list-incidencia';
  }

}
