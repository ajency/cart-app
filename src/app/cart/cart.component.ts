import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() cartItems: any; //contains the items to be displayed in the cart sent from the parent element
  @Input() showCart: boolean; //used to toggling the display of cart
  @Output() closeCartEmitter =  new EventEmitter(); //event emitter  for closing the cart
  @Output() updateCartCount =  new EventEmitter(); //event emitter for updating the item count shown on top of the cart icon
  
  totalItemDiscount:number =0; //used for storing the overall discount of the product of the cart
  totalItemPrice:number =0; //used for storing the overall price of the product of the cart
  toastMsg: string='';  //used managing the toast message
  showToast:boolean=false;  //used for toggling the toast display 

  constructor() { 
  }

  ngOnInit() {
    this.calculateFinalPriceSummary(); //on initailisation calling the calculate final price
  }

//emits an evnt to the parent component for closing the cart
  closeCart(){
  	this.closeCartEmitter.emit();
  }

  //function used for removed the item from the cart items and also updating the localStorage
  removeFromCart(id){
    let i = this.cartItems.length;
    while(i--){
       if(this.cartItems[i] && this.cartItems[i]['id'] === id){ 
           this.cartItems.splice(i,1);
           localStorage.setItem('demo-cart',JSON.stringify(this.cartItems));
           this.updateCartCount.emit(this.cartItems.length); //emitting the cart count event with the count to be shown
       }
    }
    // on completing the remove operation calling the price calculation function
    this.calculateFinalPriceSummary();
  }

  //used for updating the quantity of the product and also handling the max. and min. quantity 
  AddRemoveQty(id,add){
    let item = this.cartItems.find(i => i.id === id)
    if(add){
      item['qty'] += 1;
      if(item['qty'] == 5)
        this.showMaxQuantityReached(true);
    }
    else{
      item['qty'] -= 1;
      if(item['qty'] == 1)
        this.showMaxQuantityReached();
    }
    this.calculateFinalPriceSummary();
  }


  //used for calculating the final price and discount
  calculateFinalPriceSummary(){
    this.totalItemPrice=0;
    this.totalItemDiscount=0;
    if(this.cartItems){
      for(let i of this.cartItems){
        this.totalItemPrice+= i.qty*i.mrp_price;
        this.totalItemDiscount+= i.qty*(i.mrp_price-i.selling_price);
      }
    }
  }

  //used for displaying the toast for max. and min. quanity reached
  showMaxQuantityReached(max = false){
    this.toastMsg = max?" Max. quantity reached!":" Min. quantity reached!";
    this.showToast=true;
    //for hiding the toast after a delay
    setTimeout(() => {
      this.showToast=false;
    },1500)
  }
}
