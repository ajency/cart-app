import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-loader',
  templateUrl: './list-loader.component.html',
  styleUrls: ['./list-loader.component.scss']
})
export class ListLoaderComponent implements OnInit {

	DemoArray:any;
  constructor() { }

  ngOnInit() {
  	this.DemoArray = new Array(2);
  }

}