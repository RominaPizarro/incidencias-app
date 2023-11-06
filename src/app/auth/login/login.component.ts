
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Component, OnInit, ElementRef, ViewChildren, ViewChild } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent  implements OnInit {

  @ViewChild(IonCard, { read: ElementRef }) card!: ElementRef<HTMLIonCardElement>;

  username: string = '';
  password: string = '';

  private animation!: Animation;

  constructor(private alertController: AlertController, private router: Router, private animationCtrl: AnimationController) { }

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
  login(): void{
    this.router.navigate(['admin']);
  }

}
