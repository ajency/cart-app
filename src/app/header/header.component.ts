import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

	headerContent:any;
  	CartCountListener:Subscription;
  	cart_count:any='';
  constructor(private appservice:AppServiceService) { }

  ngOnInit() {
  	this.headerContent ="Shopping";
  	this.CartCountListener = this.appservice.listenToCartCountTrigger().subscribe((count)=>{this.cart_count = count;});
  }

  openCart(){
  	this.appservice.openCartTrigger();
  }



}
