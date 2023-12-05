import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Estado } from 'src/app/models/estado';
import { Usuario } from 'src/app/models/usuario';
import { ServicioDBService } from 'src/app/services/servicio-db.service';

@Component({
  selector: 'app-add-incidencia',
  templateUrl: './add-incidencia.component.html',
  styleUrls: ['./add-incidencia.component.scss'],
})
export class AddIncidenciaComponent implements OnInit {
  @Input() componenteSelected: any = {};

  codigo: string = '';
  nombre: string = '';
  area: string = '';
  estadoId!: number;
  descripcion: string = '';
  usuarioReporta!: Usuario;

  areas = [
    'Recursos Humanos',
    'Oficina de Técnologías de Información',
    'Atención al Cliente',
  ];
  estados: Estado[] = [];

  constructor(private service: ServicioDBService) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    this.usuarioReporta = JSON.parse(user ? user : '');
    this.inicializar();
  }

  inicializar() {
    this.service.dbState().subscribe((res) => {
      if (res) {
        this.service.fetchEstados().subscribe((data) => {
          this.estados = data;
        });
      }
    });
  }

  guardar() {
    if (this.codigo.trim().length == 0) {
      this.service.presentToast('El campo codigo es requerido');
      return;
    }

    if (this.nombre.trim().length == 0) {
      this.service.presentToast('El campo nombre es requerido');
      return;
    }

    if (this.area.trim().length == 0) {
      this.service.presentToast('El campo área es requerido');
      return;
    }

    if (!this.estadoId) {
      this.service.presentToast('El campo estado es requerido');
      return;
    }

    if (!this.usuarioReporta) {
      this.service.presentToast('El campo usuario reporta es requerido');
      return;
    }

    const data = {
      codigo: this.codigo,
      nombre: this.nombre,
      fecha: new Date(),
      area: this.area,
      descripcion: this.descripcion,
      usuarioReportaId: this.usuarioReporta.id,
      estadoId: this.estadoId,
    };

    this.service.agregarIncidencia(data).then(
      (res) => {
        this.service.presentToast('Incidencia agregado.');
        this.cancelar();
      },
      (err) => {
        if (err.code == '6') {
          this.service.presentToast('El código ya existe.' + JSON.stringify(err));
        } else {
          this.service.presentToast('No se pudo agregar la incidencia');
        }
      }
    );
  }

  cancelar() {
    this.componenteSelected.selected = 'list-incidencia';
  }
}
