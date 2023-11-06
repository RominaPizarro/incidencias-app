import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RolesPageRoutingModule } from './roles-routing.module';

import { RolesPage } from './roles.page';
import { AddRolComponent } from './components/add-rol/add-rol.component';
import { ListRolComponent } from './components/list-rol/list-rol.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RolesPageRoutingModule,
  ],
  declarations: [RolesPage, AddRolComponent, ListRolComponent],
  exports: [RolesPage]
})
export class RolesPageModule {}
