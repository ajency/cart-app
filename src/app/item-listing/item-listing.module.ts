import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemListingRoutingModule } from './item-listing-routing.module';

import { ItemListingComponent } from './item-listing.component';
import { ItemCardComponent } from '../item-card/item-card.component';

@NgModule({
  declarations: [ItemListingComponent,ItemCardComponent],
  imports: [
    CommonModule,
    ItemListingRoutingModule
  ]
})
export class ItemListingModule { }
