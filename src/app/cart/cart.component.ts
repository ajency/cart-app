import { Component, OnInit,Input } from '@angular/core';
import {AppServiceService} from '../service/app-service.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() cartItems: any;
  @Input() showCart: any;
  totalItemDiscount:any =0;
  totalItemPrice:any =0;
  OpenCartListener: Subscription;

  constructor(private appservice:AppServiceService) { 
    this.OpenCartListener = this.appservice.listenToOpenCartTrigger().subscribe(()=>{ this.calculateFinalPriceSummary()});
  }

  ngOnInit() {
    this.calculateFinalPriceSummary()
  }

  closeCart(){
  	// $('body').attr('overflow-y','auto');
  	this.appservice.closeCartTrigger();
  }

  removeFromCart(id){
    let i = this.cartItems.length;
    while(i--){
       if(this.cartItems[i] && this.cartItems[i]['id'] === id){ 
           this.cartItems.splice(i,1);
           localStorage.setItem('demo-cart',JSON.stringify(this.cartItems));
           this.appservice.cartCountTrigger(this.cartItems.length);
       }
    }
    this.calculateFinalPriceSummary();
  }

  AddRemoveQty(id,add){
    let i = this.cartItems.length;
   while(i--){
       if(this.cartItems[i] && this.cartItems[i]['id'] === id){ 
         if(add)
           this.cartItems[i]['qty'] += 1;
         else
           this.cartItems[i]['qty'] -= 1;
         this.calculateFinalPriceSummary();
       }
    } 
  }

  calculateFinalPriceSummary(){
    this.totalItemPrice=0;
    this.totalItemDiscount=0;
    for(let i of this.cartItems){
      this.totalItemPrice+= i.qty*i.mrp_price;
      this.totalItemDiscount+= i.qty*(i.mrp_price-i.selling_price);
    }
  }
}
