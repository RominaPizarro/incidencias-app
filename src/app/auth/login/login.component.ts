import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import {
  Component,
  OnInit,
  ElementRef,
  ViewChildren,
  ViewChild,
} from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { ServicioDBService } from 'src/app/services/servicio-db.service';
import { ServicioApiService } from 'src/app/services/servicio-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  @ViewChild(IonCard, { read: ElementRef })
  card!: ElementRef<HTMLIonCardElement>;

  username: string = '';
  password: string = '';
  data: any[] = [];

  private animation!: Animation;

  constructor(
    private alertController: AlertController,
    private router: Router,
    private animationCtrl: AnimationController,
    private service: ServicioDBService,
    private serviceApi: ServicioApiService
  ) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card.nativeElement)
      .duration(3000)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('background', 'red', 'var(--background)');

    this.play();
  }

  play() {
    this.animation.play();
  }

  login() {
    if (this.username.length == 0) {
      this.service.presentToast('El campo username es requerido');
      return;
    }

    if (this.password.length == 0) {
      this.service.presentToast('El campo password es requerido');
      return;
    }

    this.service.loginUsuario(this.username, this.password).then(
      (res) => {
        if (res.rows.length > 0) {
          const userLogged = {
            id: res.rows.item(0).id,
            nombres: res.rows.item(0).nombres,
            apellidos: res.rows.item(0).apellidos,
            documentoIdentidad: res.rows.item(0).documentoIdentidad,
            email: res.rows.item(0).email,
            username: res.rows.item(0).username,
            password: res.rows.item(0).password,
            rolId: res.rows.item(0).rolId,
            rolNombre: res.rows.item(0).rolNombre,
          };

          this.username = '';
          this.password = '';

          localStorage.setItem('user', JSON.stringify(userLogged));
          localStorage.setItem('rol', userLogged.rolNombre);

          this.router.navigate(['/admin']);
        } else {
          this.service.presentToast('Credenciales incorrectas');
        }
      },
      (err) => {}
    );
  }

  consumirAPI(): void{
    this.serviceApi.consumirAPI().subscribe((res) => {
      this.data = res.categories;
    });
  }


}
