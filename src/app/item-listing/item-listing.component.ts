import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';
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
	CloseCartListener: Subscription;
	cartItems:any;
	cartCount:number=0;
	showToastValue:boolean=false;
	toastMsg: string='';
  constructor(private apiservice:ApiServiceService) {}

	ngOnInit() {
		this.fetchItems();
		if(localStorage.getItem('demo-cart')){
			this.cartItems = JSON.parse(localStorage.getItem('demo-cart'));
			this.cartCount = this.cartItems.length;
		}
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
				'img_url':'https://t5.rbxcdn.com/d63befb75d7a381fe4340d9cc8ee1961'
			};
			tempArray.push(tempItem);
		}
		return tempArray;
	}

	openCart(){
		this.ShowCart =true; 
		document.getElementsByTagName("body")[0].style.overflowY = "hidden";
	}

	closeCart(){
		this.ShowCart =false;
		document.getElementsByTagName("body")[0].style.overflowY = "auto";
	}

	AddtoCart(item){
		let items = this.cartItems;
	    if(items.length == 0 || !items.find(i => i.id === item.id))
	    {
	      	item.qty = 1;
	       	this.cartItems.unshift(item);
	       	localStorage.setItem('demo-cart',JSON.stringify(this.cartItems));
	       	this.cartCount=this.cartItems.length;
	       	this.showToast();
	    } 
	    else{
	        this.showToast(true);
	    }
	}

  	showToast(added=false){
    	this.showToastValue = true;
    	this.toastMsg = added?"Already added to cart!": "Successfully added to cart!";
    	setTimeout(()=>{
       		this.showToastValue = false;
    	},1500)
  	}
}
