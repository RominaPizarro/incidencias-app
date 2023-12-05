import { Component, Input, OnInit } from '@angular/core';
import { ServicioDBService } from 'src/app/services/servicio-db.service';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.scss'],
})
export class AddRolComponent implements OnInit {
  @Input() componenteSelected: any = {};

  nombre: string = '';
  descripcion: string = '';

  constructor(private service: ServicioDBService) {}

  ngOnInit() {}

  guardar() {
    if (this.nombre.length == 0) {
      this.service.presentToast('El nombre es requerido');
      return;
    }

    const data = {
      nombre: this.nombre.trim(),
      descripcion: this.descripcion.trim(),
    };

    this.service.agregarRol(data).then(
      (res) => {
        this.service.presentToast('Rol agregado.');
        this.cancelar();
      },
      (err) => {
        if (err.code == '6') {
          this.service.presentToast('El rol ya existe');
        } else {
          this.service.presentToast('No se pudo agregar el rol');
        }
      }
    );
  }

  cancelar() {
    this.componenteSelected.selected = 'list-rol';
  }
}
