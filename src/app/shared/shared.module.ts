import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.service';
import { AuthService } from './services/auth.service';
import { HttpService } from './services/http.service';
import { StorageService } from './services/storage.service';
import { ToastService } from './services/toast.service';
import { LoaderService } from './services/loader.service';
import { IonicModule } from '@ionic/angular';
import { VehicleService } from './services/vehicle.service';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './components/modal/modal.component';
import { VehicleModalComponent } from './components/vehicle-modal/vehicle-modal.component';

@NgModule({
  declarations: [ModalComponent, VehicleModalComponent],
  entryComponents: [ModalComponent, VehicleModalComponent],
  providers: [ModalService, AuthService, HttpService, StorageService, ToastService, LoaderService, VehicleService],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
