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
	OpenCartListener: Subscription;
	CloseCartListener: Subscription;
  constructor(private apiservice:ApiServiceService, private appservice:AppServiceService) { 
  	    this.OpenCartListener = this.appservice.listenToOpenCartTrigger().subscribe(()=>{ console.log('show cart');this.ShowCart =true; });
  	    this.CloseCartListener = this.appservice.listenToCloseCartTrigger().subscribe(()=>{ console.log('close cart');this.ShowCart =false; });
  }

	ngOnInit() {
		this.fetchItems();
	}

	ngOnDestroy(){
		this.OpenCartListener.unsubscribe();
		this.CloseCartListener.unsubscribe();
	}

	fetchItems(){
		this.apiservice.request('bins/qhnfp', 'get', {} , {}).then((response)=>{
		this.showLoader = false;
		this.ApiCallComplete = true;
	    this.items = this.formatData(response);
	    console.dir(this.items);
	  })
	  .catch((error)=>{
	  	this.ApiCallComplete = true;
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
