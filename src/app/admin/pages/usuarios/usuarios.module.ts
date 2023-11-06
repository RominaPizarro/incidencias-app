import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UsuariosPageRoutingModule } from './usuarios-routing.module';

import { UsuariosPage } from './usuarios.page';
import { AddUsuarioComponent } from './components/add-usuario/add-usuario.component';
import { ListUsuarioComponent } from './components/list-usuario/list-usuario.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UsuariosPageRoutingModule
  ],
  declarations: [UsuariosPage, AddUsuarioComponent, ListUsuarioComponent],
  exports: [UsuariosPage],
})
export class UsuariosPageModule {}
