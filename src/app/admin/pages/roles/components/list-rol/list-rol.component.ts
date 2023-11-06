import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html',
  styleUrls: ['./list-rol.component.scss'],
})
export class ListRolComponent implements OnInit {
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

  ngOnInit() {}
}
