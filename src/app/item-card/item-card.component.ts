import { Component, OnInit, Input } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
	@Input() item : any;
  constructor(private appservice:AppServiceService) { }

  ngOnInit() {
  }

  AddToCart(item){
    console.log('inisde add to cart');
  	let items = this.appservice.cartItems;
    if(items.length == 0 || !this.checkIfAlreadyPresent(item,items))
    {
      item.qty = 1;
       this.appservice.cartItems.push(item);
       this.appservice.cartCountTrigger(this.appservice.cartItems.length);
    } 
  }  

  checkIfAlreadyPresent(item,items){
    for(let i of items){
      if(i.id == item.id)
        return true;
    }
    return false;
  }

}
