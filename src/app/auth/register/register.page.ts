import { Component, OnInit } from '@angular/core';
import { Platform, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(
    private platform: Platform,
    public navCtrl: NavController
  ) { }

  openRequestedPage(pageLink){
    this.navCtrl.navigateForward(pageLink);
  }

  ngOnInit() {
  }

}
