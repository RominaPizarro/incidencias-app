import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-estado',
  templateUrl: './add-estado.component.html',
  styleUrls: ['./add-estado.component.scss'],
})
export class AddEstadoComponent  implements OnInit {

  @Input() componenteSelected: any = {};

  nombre: string = '';
  descripcion: string = '';

  constructor() {}

  ngOnInit() {
  }

  guardar() {}

  cancelar() {
    this.componenteSelected.selected = 'list-estado';
  }

}
