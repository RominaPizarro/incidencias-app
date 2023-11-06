import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.page.html',
  styleUrls: ['./roles.page.scss'],
})
export class RolesPage implements OnInit {

  componente: any = {selected: 'list-rol'};

  constructor() { }

  ngOnInit() {
  }

  changeComponent(componente: string): void{
    this.componente.selected = componente;
  }

}
