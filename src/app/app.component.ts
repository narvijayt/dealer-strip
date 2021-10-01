import { Component } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent { 
  constructor(
    private platform: Platform,
    public navCtrl: NavController,
  ) {  }

}
