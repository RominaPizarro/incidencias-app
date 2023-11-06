import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.scss'],
})
export class AddRolComponent implements OnInit {
  @Input() componenteSelected: any = {};

  nombre: string = '';
  descripcion: string = '';

  constructor() {}

  ngOnInit() {
  }

  guardar() {}

  cancelar() {
    this.componenteSelected.selected = 'list-rol';
  }
}
