import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
import { AppServiceService } from '../service/app-service.service';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.scss']
})
export class ItemListingComponent implements OnInit {

	items: any;
	ShowCart:boolean=false;
	showLoader:boolean=true;
	ApiCallComplete: boolean=false;
	ApiError:boolean =false;
	OpenCartListener: Subscription;
	CloseCartListener: Subscription;
	FetchItemListener: Subscription;
	cartItems:any;
  constructor(private apiservice:ApiServiceService, private appservice:AppServiceService) { 
  	    this.OpenCartListener = this.appservice.listenToOpenCartTrigger().subscribe(()=>{ this.ShowCart =true; this.cartItems = this.appservice.cartItems; document.getElementsByTagName("body")[0].style.overflowY = "hidden"; });
  	    this.CloseCartListener = this.appservice.listenToCloseCartTrigger().subscribe(()=>{ this.ShowCart =false; this.cartItems = this.appservice.cartItems; document.getElementsByTagName("body")[0].style.overflowY = "auto";});
  	    this.FetchItemListener = this.appservice.listenToFetchItemTrigger().subscribe(()=>{ this.fetchItems();});
  }

	ngOnInit() {
		this.fetchItems();
		if(localStorage.getItem('demo-cart')){
			this.appservice.cartItems = JSON.parse(localStorage.getItem('demo-cart'));
			this.appservice.cartCountTrigger(this.appservice.cartItems.length);
		}
		this.cartItems = this.appservice.cartItems;
	}

	ngOnDestroy(){
		this.OpenCartListener.unsubscribe();
		this.CloseCartListener.unsubscribe();
		this.FetchItemListener.unsubscribe();
	}

	fetchItems(){
		this.apiservice.request('bins/qhnfp', 'get', {} , {}).then((response)=>{
		this.showLoader = false;
		this.ApiCallComplete = true;
	  	this.ApiError = false;
	    this.items = this.formatData(response);
	  })
	  .catch((error)=>{
	  	this.showLoader = false;
	  	this.ApiCallComplete = true;
	  	this.ApiError = true;
	    console.log("error ===>", error);
	  }) 
	}

	formatData(data){
		let tempArray= [],tempItem={};
		for(let i of data){
			tempItem = {
				'id':i.id,
				'name':i.name,
				'mrp_price': i.price,
				'selling_price': (i.price - (i.price *(i.discount/100))),
				'discount':i.discount,
				'img_url':'https://upload.wikimedia.org/wikipedia/commons/2/24/Blue_Tshirt.jpg'
			};
			tempArray.push(tempItem);
		}
		return tempArray;
	}



}
