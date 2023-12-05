import { Component, Input, OnInit } from '@angular/core';
import { Rol } from 'src/app/models/rol';
import { ServicioDBService } from 'src/app/services/servicio-db.service';

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
  rolId!: number;
  username: string = '';
  password: string = '';

  roles: Rol[] = [];

  constructor(private service: ServicioDBService) {}

  ngOnInit() {
    this.listarRoles();
  }

  listarRoles(){
    this.service.dbState().subscribe(res => {
      if(res){
        this.service.fetchRoles().subscribe(data => {
          this.roles = data;
        });
      }
    });
  }

  guardar() {
    if(this.nombres.trim().length == 0){
      this.service.presentToast('El campo nombres es requerido');
      return;
    }

    if(this.apellidos.trim().length == 0){
      this.service.presentToast('El campo apellidos es requerido');
      return;
    }

    if(this.documentoIdentidad.trim().length == 0){
      this.service.presentToast('El campo documento de identidad es requerido');
      return;
    }

    if(this.email.trim().length == 0){
      this.service.presentToast('El campo email es requerido');
      return;
    }

    if(this.username.trim().length == 0){
      this.service.presentToast('El campo username es requerido');
      return;
    }

    if(this.password.trim().length == 0){
      this.service.presentToast('El campo password es requerido');
      return;
    }

    if(!this.rolId){
      this.service.presentToast('El campo rol es requerido');
      return;
    }

    const data = {
      nombres: this.nombres,
      apellidos: this.apellidos,
      documentoIdentidad: this.documentoIdentidad,
      email: this.email,
      username: this.username,
      password: this.password,
      rolId: this.rolId
    };

    this.service.agregarUsuario(data).then(
      (res) => {
        this.service.presentToast('Usuario agregado.');
        this.cancelar();
      },
      (err) => {
        if (err.code == '6') {
          this.service.presentToast('El username ya existe');
        } else {
          this.service.presentToast('No se pudo agregar el usuario');
        }
      }
    );
  }

  cancelar() {
    this.componenteSelected.selected = 'list-usuario';
  }

}
