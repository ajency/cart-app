import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-erro-page',
  templateUrl: './erro-page.component.html',
  styleUrls: ['./erro-page.component.scss']
})
export class ErroPageComponent implements OnInit {

	@Output() callFetchApi = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  callFetch(){
  	this.callFetchApi.emit();
  }

}
