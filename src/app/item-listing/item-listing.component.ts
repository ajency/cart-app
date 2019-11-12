import { Component, OnInit } from '@angular/core';
import {ApiServiceService} from '../service/api-service.service'

@Component({
  selector: 'app-item-listing',
  templateUrl: './item-listing.component.html',
  styleUrls: ['./item-listing.component.scss']
})
export class ItemListingComponent implements OnInit {

	items: any;
  constructor(private apiservice:ApiServiceService) { }

	ngOnInit() {
		this.fetchItems();
	}

	fetchItems(){
		 this.apiservice.request('bins/qhnfp', 'get', {} , {}).then((response)=>{
	    this.items = this.formatData(response);
	    console.dir(this.items);
	  })
	  .catch((error)=>{
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
