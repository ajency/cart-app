import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  @Input() cartItems: any;
  @Input() showCart: boolean;
  @Output() closeCartEmitter =  new EventEmitter();
  @Output() updateCartCount =  new EventEmitter();
  
  totalItemDiscount:number =0;
  totalItemPrice:number =0;
  toastMsg: string='';
  showToast:boolean=false;

  constructor() { 
  }

  ngOnInit() {
    this.calculateFinalPriceSummary()
  }

  closeCart(){
  	this.closeCartEmitter.emit();
  }

  removeFromCart(id){
    let i = this.cartItems.length;
    while(i--){
       if(this.cartItems[i] && this.cartItems[i]['id'] === id){ 
           this.cartItems.splice(i,1);
           localStorage.setItem('demo-cart',JSON.stringify(this.cartItems));
           this.updateCartCount.emit(this.cartItems.length);
       }
    }
    this.calculateFinalPriceSummary();
  }

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

  calculateFinalPriceSummary(){
    this.totalItemPrice=0;
    this.totalItemDiscount=0;
    for(let i of this.cartItems){
      this.totalItemPrice+= i.qty*i.mrp_price;
      this.totalItemDiscount+= i.qty*(i.mrp_price-i.selling_price);
    }
  }

  showMaxQuantityReached(max = false){
    this.toastMsg = max?" Max. quantity reached!":" Min. quantity reached!";
    this.showToast=true;
    setTimeout(() => {
      this.showToast=false;
    },1500)
  }
}
