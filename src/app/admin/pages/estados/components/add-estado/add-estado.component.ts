import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicioDBService } from 'src/app/services/servicio-db.service';

@Component({
  selector: 'app-add-estado',
  templateUrl: './add-estado.component.html',
  styleUrls: ['./add-estado.component.scss'],
})
export class AddEstadoComponent  implements OnInit {

  @Input() componenteSelected: any = {};

  nombre: string = '';
  descripcion: string = '';

  constructor(private service: ServicioDBService) {}

  ngOnInit() {
  }

  guardar() {
    if(this.nombre.length == 0){
      this.service.presentToast('El nombre es requerido');
      return;
    }

    const data = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim()
    };

    this.service.agregarEstado(data).then(
      (res) => {
        this.service.presentToast('Estado agregado.');
        this.cancelar();
      },
      (err) => {
        if (err.code == '6') {
          this.service.presentToast('El estado ya existe');
        } else {
          this.service.presentToast('No se pudo agregar el estado');
        }
      }
    );
  }

  cancelar() {
    this.componenteSelected.selected = 'list-estado';
  }

}
