import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() cartCount:number;
  @Output() openCartEvent = new EventEmitter();
	headerContent:string;
  
  constructor() { }

  ngOnInit() {
  	this.headerContent ="Shopping";
  }

  openCart(){
  	this.openCartEvent.emit();
  }
}
