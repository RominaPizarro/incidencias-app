import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss'],
})
export class ListUsuarioComponent  implements OnInit {


  usuarios = [
    {
      id: 1,
      nombres: 'ROMINA LORETO',
      apellidos: 'PIZARRO CABANAS',
      documentoIdentidad: '12345678',
      email: 'romina@gmail.com',
      rol: { nombre: 'ADMINISTRADOR' }
    },
    {
      id: 1,
      nombres: 'ROMINA LORETO',
      apellidos: 'PIZARRO CABANAS',
      documentoIdentidad: '12345678',
      email: 'romina@gmail.com',
      rol: { nombre: 'ADMINISTRADOR' }
    }
  ];



  constructor() { }

  ngOnInit() {}

}
