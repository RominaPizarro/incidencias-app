import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EstadosPageRoutingModule } from './estados-routing.module';

import { EstadosPage } from './estados.page';
import { AddEstadoComponent } from './components/add-estado/add-estado.component';
import { ListEstadoComponent } from './components/list-estado/list-estado.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EstadosPageRoutingModule
  ],
  declarations: [EstadosPage, AddEstadoComponent, ListEstadoComponent],
  exports: [EstadosPage]
})
export class EstadosPageModule {}
