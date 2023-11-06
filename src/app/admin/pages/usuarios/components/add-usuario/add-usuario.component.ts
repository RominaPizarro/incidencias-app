import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.scss'],
})
export class AddUsuarioComponent  implements OnInit {

  @Input() componenteSelected: any = {};

  nombres: string = '';
  apellidos: string = '';
  documentoIdentidad: string = '';
  email: string = '';
  rol: any = '';
  username: string = '';
  password: string = '';

  roles: any = [
    {
      id: 1,
      nombre: 'Administrador',
      descripcion: '',
    },
    {
      id: 2,
      nombre: 'Empleado',
      descripcion: '',
    },
  ];

  constructor() {}

  ngOnInit() {
  }

  guardar() {}

  cancelar() {
    this.componenteSelected.selected = 'list-usuario';
  }

}
