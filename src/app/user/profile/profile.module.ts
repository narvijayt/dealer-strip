import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { ProductGridViewComponent } from '../../components/product-grid-view/product-grid-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfilePageRoutingModule
  ],
  entryComponents:[ProductGridViewComponent],
  declarations: [ProfilePage, ProductGridViewComponent]
})
export class ProfilePageModule {}
