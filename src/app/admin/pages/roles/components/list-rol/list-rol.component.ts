import { Component, OnInit } from '@angular/core';
import { ServicioDBService } from 'src/app/services/servicio-db.service';

@Component({
  selector: 'app-list-rol',
  templateUrl: './list-rol.component.html',
  styleUrls: ['./list-rol.component.scss'],
})
export class ListRolComponent implements OnInit {
  roles: any = [];

  constructor(private service: ServicioDBService) {}

  ngOnInit() {
    this.listar();
  }

  listar() {
    this.service.dbState().subscribe((res) => {
      if (res) {
        this.service.fetchRoles().subscribe((data) => {
          this.roles = data;
        });
      }
    });
  }
}
