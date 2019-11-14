import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApiServiceService } from '../service/api-service.service';

@Component({
  selector: 'app-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.scss']
})
export class ItemListingComponent implements OnInit {

	items: any; //for temporary storing of the items to be displayed
	ShowCart:boolean=false; //for toggling cart display
	showLoader:boolean=true; //for toggle the loader display on fetching the data
	ApiCallComplete: boolean=false; //for ensuring API call is complete
	ApiError:boolean =false; //for knowing when there is an API failure
	cartItems:any =[]; //for storing the items to be displayed in the cart
	cartCount:number=0; //for displaying the cart item count on the cart icon
	showToastValue:boolean=false; //for toast display toggling
	toastMsg: string=''; //for altering the toast message
  constructor(private apiservice:ApiServiceService) {}

	ngOnInit() {
		this.fetchItems();
		//fetch content from localStorage if present for cart
		if(localStorage.getItem('demo-cart')){
			this.cartItems = JSON.parse(localStorage.getItem('demo-cart'));
			this.cartCount = this.cartItems.length;
		}
	}

	//function for fetching data from apiu
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

	//formatting the data according to the need
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

	//function for opening and closing the cart along with toggling body scroll
	toggleCartDisplay(display= false){
		this.ShowCart =display; 
		document.getElementsByTagName("body")[0].style.overflowY = display?"hidden":"auto";
	}

	// function for adding item to cart and also show warning for adding duplicate item
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

	//function for toggling the toast display
  	showToast(added=false){
    	this.showToastValue = true;
    	this.toastMsg = added?"Already added to cart!": "Successfully added to cart!";
    	setTimeout(()=>{
       		this.showToastValue = false;
    	},1500)
  	}
}
