import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service'
import { Subscription } from 'rxjs';

// declare var $: any;


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
  	this.headerContent ="Ajency Shopping";
  	this.CartCountListener = this.appservice.listenToCartCountTrigger().subscribe((count)=>{this.cart_count = count;});
  }

  openCart(){
  	this.appservice.openCartTrigger();
  	// $('body').attr('overflow-y','none');
  }



}
