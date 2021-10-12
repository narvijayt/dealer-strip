import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController, ActionSheetController  } from '@ionic/angular';

import { ModalService } from '../../shared/services/modal.service';
import { AuthService } from './../../shared/services/auth.service';
import { AuthConstants } from '../../../../auth-constants';
import { StorageService } from './../../shared/services/storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  userData : any;
  segmentModel = "viso";

  constructor(
    public router: Router,
    private navCtrl: NavController,
    private _modalService: ModalService,
    private storageService: StorageService,
    private auth: AuthService,
    public actionSheetController: ActionSheetController,
  ) { 
    this.storageService.get(AuthConstants.AUTH).then( user => {
      if(!user){
        this.router.navigate(['/login']);
      }else{
        this.userData = user;
      }
    });
  }

  ionViewWillEnter(){

  }

  backRedirect(){
    this.navCtrl.back();
  }

  openVehicleForm(): void {
    this._modalService.openVehicleForm();
  }

  async openActionSheetController(){
    const actionSheet = await this.actionSheetController.create({
      header: 'Setting',
      cssClass: 'profile-actions',
      buttons: [
        {
          text: 'Logout',
          icon: 'log-out-outline',
          role: 'logout',
          handler: () => {
            this.auth.logout();
          }
        }, {
          text: 'Cancel',
          icon: 'close',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);   
  }

  ngOnInit() {
  }

  segmentChanged(event){    
    console.log(event);
  }

}
