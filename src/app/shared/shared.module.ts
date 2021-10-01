import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from './services/modal.service';
import { IonicModule } from '@ionic/angular';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ModalComponent } from './components/modal/modal.component';
import { VehicleModalComponent } from './components/vehicle-modal/vehicle-modal.component';

@NgModule({
  declarations: [ModalComponent, VehicleModalComponent],
  entryComponents: [ModalComponent, VehicleModalComponent],
  providers: [ModalService],
  imports: [
    CommonModule,
    IonicModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
