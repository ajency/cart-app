import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListingComponent } from './item-listing.component';
import { CartComponent } from '../cart/cart.component';

const routes: Routes = [
	{ path: '',  component: ItemListingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemListingRoutingModule { }
