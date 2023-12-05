import { Component } from '@angular/core';
import { ServicioDBService } from './services/servicio-db.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private service: ServicioDBService) {
  }
}
