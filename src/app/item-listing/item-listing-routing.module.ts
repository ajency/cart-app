import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemListingComponent } from './item-listing.component';

const routes: Routes = [
	{ path: '',  component: ItemListingComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemListingRoutingModule { }
