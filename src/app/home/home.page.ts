import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(
    private platform: Platform,
    public navCtrl: NavController
  ) {}

  openRequestedPage(pageLink){
    this.navCtrl.navigateForward(pageLink);
  }
}
