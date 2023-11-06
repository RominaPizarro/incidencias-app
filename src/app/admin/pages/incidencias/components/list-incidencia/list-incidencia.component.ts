import { Component, OnInit, ElementRef, ViewChildren } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-list-incidencia',
  templateUrl: './list-incidencia.component.html',
  styleUrls: ['./list-incidencia.component.scss'],
})
export class ListIncidenciaComponent implements OnInit {
  @ViewChildren(IonCard, { read: ElementRef }) cardElements!: QueryList<
    ElementRef<HTMLIonCardElement>
  >;

  private cards!: Animation;

  incidencias = [
    {
      id: 1,
      codigo: 'INC001',
      nombre: 'Internet fuera de servicio',
      descripcion:
        'No hay internet en ninguna de las máquinas en el área de atención al cliente',
      area: 'Atención al Cliente',
      usuarioReporta: { nombre: 'ROMINA LORETO PIZARRO CABANAS' },
      fecha: '2023-11-06 08:00:00',
      fechaActualizacion: '',
      usuarioAsignado: null,
      comentarios: '',
      estado: { nombre: 'PENDIENTE' },
    },
    {
      id: 2,
      codigo: 'INC002',
      nombre: 'No se puede agregar a nuevo personal',
      descripcion:
        'Al intentar guardar la información del nuevo personal, se produce un error 404',
      area: 'Recursos Humanos',
      usuarioReporta: { nombre: 'ANNA GUTIERREZ' },
      fecha: '2023-11-06 09:00:00',
      fechaActualizacion: '2023-11-06 09:30:00',
      usuarioAsignado: { nombre: 'PEPITO CODER' },
      comentarios: 'Resuelto sin inconvenientes',
      estado: { nombre: 'RESUELTO' },
    },
  ];

  constructor(private animationCtrl: AnimationController) {}

  ngOnInit() {}

  ngAfterViewInit() {
    if (this.cardElements.length > 0) {
      const firstCardElement = this.cardElements.get(0);
      if (firstCardElement) {
        const nativeElement = firstCardElement.nativeElement;

        this.cards = this.animationCtrl
          .create()
          .addElement(nativeElement)
          .fill('none')
          .duration(1000)
          .keyframes([
            { offset: 0, transform: 'scale(1) rotate(0)' },
            { offset: 0.5, transform: 'scale(1.2) rotate(45deg)' },
            { offset: 1, transform: 'scale(1) rotate(0)' },
          ]);

        this.play();
      }
    }
  }

  async play() {
    await this.cards.play();

    this.cards.pause();
  }

  getColorCard(estado: any) {
    switch (estado.nombre) {
      case 'PENDIENTE':
        return 'warning';
      case 'RESUELTO':
        return 'success';

      default:
        break;
    }
    return 'light';
  }
}
