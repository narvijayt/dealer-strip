import { Injectable } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalComponent } from '../components/modal/modal.component';
import { VehicleModalComponent } from '../components/vehicle-modal/vehicle-modal.component';
import { LoaderService } from '../../shared/services/loader.service';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private _modalController: ModalController,
    private loaderService: LoaderService,
    ) { }

  presentModal(): void {
    this._modalController.create({
      component: ModalComponent,
      componentProps: {
        'header': 'My awesome modal window!',
        'description': 'Boom pow!'
      },
      id: '1'
    }).then(modal => modal.present());
  }

  openVehicleForm(): void {
    this._modalController.create({
      component: VehicleModalComponent,
      cssClass: 'new-vehicle-form',
    }).then( (modal) => {
      modal.present();
    });
  }
}
