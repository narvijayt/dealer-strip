import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  constructor(
    public loadingController: LoadingController
  ) { }

  // Simple loader
  showLoader() {
    this.loadingController.create({
      message: 'Please wait...',
      cssClass:'loader-css-class',
      backdropDismiss:true
    }).then((response) => {
      response.present();
    });
  }

  // Dismiss loader
  dismissLoader() {
    this.loadingController.dismiss().then((response) => {
      console.log('Loader closed!', response);
    }).catch((err) => {
      console.log('Error occured : ', err);
    });
  }
}
