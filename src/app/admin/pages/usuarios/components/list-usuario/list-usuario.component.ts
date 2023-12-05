import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/models/usuario';
import { ServicioDBService } from 'src/app/services/servicio-db.service';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.scss'],
})
export class ListUsuarioComponent  implements OnInit {


  usuarios: Usuario[] = [];

  constructor( private service: ServicioDBService) {

  }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.service.dbState().subscribe(res => {
      if(res){
        this.service.fetchUsuarios().subscribe(data => {
          this.usuarios = data;
        });
      }
    });
  }

}
