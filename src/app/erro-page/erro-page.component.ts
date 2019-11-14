import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-erro-page',
  templateUrl: './erro-page.component.html',
  styleUrls: ['./erro-page.component.scss']
})
export class ErroPageComponent implements OnInit {

	@Output() callFetchApi = new EventEmitter(); // event emitter for for fetching the API response
  constructor() { }

  ngOnInit() {
  }

  // function for emitting the fetch api event
  callFetch(){
  	this.callFetchApi.emit();
  }

}
