import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  selectedSegment = 'incidencias';
  rol: string | null = localStorage.getItem('rol');


  constructor() { }

  ngOnInit() {
  }

}
