import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
	
  @Input() item : any; //contains the item detail to be displayed in the card
  @Output() addToCartEvent = new EventEmitter(); //event emitter for adding the current item to the cartItems
  
  constructor() { }

  ngOnInit() {
  }

  //function for emitting the add ta cart event
  AddToCart(item){
    this.addToCartEvent.emit(item);
  }  
}
