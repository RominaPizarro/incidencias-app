import { Component, OnInit } from '@angular/core';
import { Estado } from 'src/app/models/estado';
import { ServicioDBService } from 'src/app/services/servicio-db.service';

@Component({
  selector: 'app-list-estado',
  templateUrl: './list-estado.component.html',
  styleUrls: ['./list-estado.component.scss'],
})
export class ListEstadoComponent  implements OnInit {

  estados: Estado[] = [];

  constructor( private service: ServicioDBService) {

  }

  ngOnInit() {
    this.listar();
  }

  listar(){
    this.service.dbState().subscribe(res => {
      if(res){
        this.service.fetchEstados().subscribe(data => {
          this.estados = data;
        });
      }
    });
  }

}
