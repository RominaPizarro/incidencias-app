import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.page.html',
  styleUrls: ['./usuarios.page.scss'],
})
export class UsuariosPage implements OnInit {

  componente: any = {selected: 'list-usuario'};

  constructor() { }

  ngOnInit() {
  }

  changeComponent(componente: string): void{
    this.componente.selected = componente;
  }

}
