import { Component, OnInit } from '@angular/core';
import { AppServiceService } from '../service/app-service.service';

@Component({
  selector: 'app-erro-page',
  templateUrl: './erro-page.component.html',
  styleUrls: ['./erro-page.component.scss']
})
export class ErroPageComponent implements OnInit {

  constructor(private appservice: AppServiceService) { }

  ngOnInit() {
  }

  callFetchAPI(){
  	this.appservice.fetchItemTrigger();
  }

}
