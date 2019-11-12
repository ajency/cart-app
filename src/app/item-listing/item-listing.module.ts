import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListingRoutingModule } from './item-listing-routing.module';

import { ItemListingComponent } from './item-listing.component';
import { ItemCardComponent } from '../item-card/item-card.component';
import { CartComponent } from '../cart/cart.component';
import { ListLoaderComponent } from '../list-loader/list-loader.component';

@NgModule({
  declarations: [ItemListingComponent,ItemCardComponent,CartComponent,ListLoaderComponent],
  imports: [
    CommonModule,
    ItemListingRoutingModule
  ]
})
export class ItemListingModule { }
