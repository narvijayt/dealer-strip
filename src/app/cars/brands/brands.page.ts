import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-brands',
  templateUrl: './brands.page.html',
  styleUrls: ['./brands.page.scss'],
})
export class BrandsPage implements OnInit {

  brands = ['Acura','Airbus','AirStream','Alfa Romeo','AM General','AMC','Aston Martin','Audi','Austin Healey','Autocar Industries'];

  constructor(
    public navCtrl: NavController
  ) { 
    console.log(this.brands);
  }

  openRequestedPage(pageLink){
    this.navCtrl.navigateForward(pageLink);
  }

  ngOnInit() {
  }

}
