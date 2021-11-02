import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { DashboardPage } from './dashboard.page';
import { ProductDashboardViewComponent } from '../components/product-dashboard-view/product-dashboard-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  entryComponents: [ProductDashboardViewComponent],
  declarations: [DashboardPage, ProductDashboardViewComponent]
})
export class DashboardPageModule {}
