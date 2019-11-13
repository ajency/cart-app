import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-item-card',
  templateUrl: './item-card.component.html',
  styleUrls: ['./item-card.component.scss']
})
export class ItemCardComponent implements OnInit {
	
  @Input() item : any;
  @Output() addToCartEvent = new EventEmitter();
  
  constructor() { }

  ngOnInit() {
  }

  AddToCart(item){
    this.addToCartEvent.emit(item);
  }  
}
