import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-estado',
  templateUrl: './list-estado.component.html',
  styleUrls: ['./list-estado.component.scss'],
})
export class ListEstadoComponent  implements OnInit {

  estados: any = [
    {
      id: 1,
      nombre: 'PENDIENTE',
      descripcion: '',
    },
    {
      id: 2,
      nombre: 'ASIGNADO',
      descripcion: '',
    },
    {
      id: 3,
      nombre: 'EN PROCESO',
      descripcion: '',
    },
    {
      id: 4,
      nombre: 'SOLUCIONADO',
      descripcion: '',
    },
    {
      id: 5,
      nombre: 'RECHAZADO',
      descripcion: '',
    },
  ];

  constructor() { }

  ngOnInit() {}

}
