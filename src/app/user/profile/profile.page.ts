import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ModalService } from '../../shared/services/modal.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  segmentModel = "viso";

  constructor(
    private navCtrl: NavController,
    private _modalService: ModalService
  ) { }

  ionViewWillEnter(){

  }

  backRedirect(){
    this.navCtrl.back();
  }

  openVehicleForm(): void {
    this._modalService.openVehicleForm();
  }

  ngOnInit() {
  }

  segmentChanged(event){    
    console.log(event);
  }

}
