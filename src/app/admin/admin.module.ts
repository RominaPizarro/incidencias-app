import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminPageRoutingModule } from './admin-routing.module';

import { AdminPage } from './admin.page';
import { RolesPageModule } from './pages/roles/roles.module';
import { EstadosPageModule } from './pages/estados/estados.module';
import { IncidenciasPageModule } from './pages/incidencias/incidencias.module';
import { UsuariosPageModule } from './pages/usuarios/usuarios.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminPageRoutingModule,
    RolesPageModule,
    EstadosPageModule,
    IncidenciasPageModule,
    UsuariosPageModule,
  ],
  declarations: [AdminPage]
})
export class AdminPageModule {}
