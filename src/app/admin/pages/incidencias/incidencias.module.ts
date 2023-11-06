import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidenciasPageRoutingModule } from './incidencias-routing.module';

import { IncidenciasPage } from './incidencias.page';
import { AddIncidenciaComponent } from './components/add-incidencia/add-incidencia.component';
import { ListIncidenciaComponent } from './components/list-incidencia/list-incidencia.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidenciasPageRoutingModule
  ],
  declarations: [IncidenciasPage, AddIncidenciaComponent, ListIncidenciaComponent],
  exports: [IncidenciasPage],
})
export class IncidenciasPageModule {}
