import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SearchPageRoutingModule } from './search-routing.module';

import { SearchPage } from './search.page';
import { ProductGridViewComponent } from '../components/product-grid-view/product-grid-view.component';
import { ProductListViewComponent } from '../components/product-list-view/product-list-view.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SearchPageRoutingModule
  ],
  entryComponents: [ProductGridViewComponent, ProductListViewComponent],
  declarations: [SearchPage, ProductGridViewComponent, ProductListViewComponent]
})
export class SearchPageModule {}
